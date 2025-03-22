import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { MapasService } from 'src/app/services/mapas.service';
import { UserHomeService } from 'src/app/services/user-home.service';
import { Recorrido } from 'src/app/models/recorrido.model';
import { RecorridoDetalle } from 'src/app/models/recorridodetalle.model';
import { BusetaService } from 'src/app/services/buseta.service';
import * as L from 'leaflet';
import { RecorridosService } from 'src/app/services/recorridos.service';
import { RecorridodetalleService } from 'src/app/services/recorridodetalle.service';
import { Coordenada } from 'src/app/models/coordenada.model';


@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrls: ['./recorridos.component.css']
})
export class RecorridosComponent implements OnInit {

  //variable
  map!: mapboxgl.Map;
  recorridoForm!: FormGroup;
  recorrido!:Recorrido;
  recorridoDetalle!:RecorridoDetalle;
  ruta:any=[];
  
  //ubicacion:any=[];
  public buseta:any=[]; //para obtener el id de la buseta

  //variables hdeleon

  

  constructor(private recorridoService: RecorridosService,private recorridoDetalleService: RecorridodetalleService ,private busetaService: BusetaService, private placesService: MapasService, private userHome: UserHomeService, private auth: AuthService, private fb: FormBuilder, private toast: NgToastService, private router: Router){
    //console.log(this.placesService)
    this.recorrido=new Recorrido();
    this.recorridoDetalle=new RecorridoDetalle();

    this.userHome.getIdFromStore().subscribe(val=>{
      const idFromToken = this.auth.getIdFromToken();
      this.recorrido.idusu=val||idFromToken;
    })
  }

    //metodo para cargar mapa
  cargarMapa(){
  (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoic2FudGlzZWJhczk3IiwiYSI6ImNscjhuY2VrdzJxNnQycXBhcXZqZ3E0ZXAifQ.GRXeJxMpdZFa5DMhOBIf5w';
  this.map = new mapboxgl.Map({
	container: 'map', // container ID id del nombre del div que contiene el mapa
	style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
 center: [-78.625736,-1.2690819], // starting position [lng, lat] //this.placesService.userLocation,
	zoom: 16.6,});
  //metodo para crear marcador
  const popup = new mapboxgl.Popup().setHTML(`<h6>Cree su ruta</h6><span>Punto de partida</span>`);
  const marker=new mapboxgl.Marker({draggable:true}).setLngLat([-78.625736,-1.2690819]).addTo(this.map).setPopup(popup);
  this.crearMarcador();
  }


  ngOnInit(): void {
    this.cargarMapa();//carga el mapa de mapbox
  //formgroup
  this.recorridoForm=this.fb.group({
  numrec:['',Validators.required],
  nombrerec:['',Validators.required],
  fecharec:['',Validators.required],
  horarec:['',Validators.required],
  preciorec:['',Validators.required],
  idbus:['',Validators.required],
  descripcion:['',Validators.required],
  idusu:this.recorrido.idusu})

  this.busetaService.ListarBusetasUsuario(this.recorrido.idusu).subscribe(res=>{
  this.buseta=res;})
  }
  

  
  

  crearMarcador(){
    const popup = new mapboxgl.Popup().setHTML(`<h6>Punto seleccionado</h6><span></span>`);
    
    this.map.on('click',(e)=>{
      var lngLat = e.lngLat;
      var lat=lngLat.lat;
      var lon=lngLat.lng;
      var marker=new mapboxgl.Marker({draggable:true}).setLngLat([lon,lat]).addTo(this.map).setPopup(popup);
      //this.currentMarkers.push(marker);
      let c:Coordenada=new Coordenada();
      c.longitud=lon.toString();
      c.latitud=lat.toString();
      //console.log(c.latitud,c.longitud)
      this.ruta.push(c);
      //console.log(this.ruta)
      
    }
    )
  }

  mostrarRuta(){

    let ubicaciones: [number, number][]=[]

    if(this.ruta.length>0){
      this.ruta.forEach((x: { longitud: string | number; latitud: string | number; })=>{
        let position:[number,number]=[+x.longitud,+x.latitud];
        ubicaciones.push(position);
      })
    }

    this.map.addSource('route',{
      'type': 'geojson',
      'data':{
        'type':'FeatureCollection',
        'features':[
          {
            'type': 'Feature',
        'properties':{},
        'geometry':{
          'type': 'LineString',
          'coordinates': ubicaciones
        }
          }
        ]
      }
    });
    this.map.addLayer({
      'id':'route',
      'type':'line',
      'source':'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint':{
        'line-color':'yellow',
        'line-width':6
      }
    });
  }

  limpiarRuta(){
    while(this.ruta.length > 0){
  this.ruta.pop(); 
    }
    

    if(this.map.getLayer('route')){
      this.map.removeLayer('route');
      this.map.removeSource('route')
      
    }
    this.cargarMapa();
  }

  //metodo registrar recorrido
  async registrarRecorrido(){
    if(this.ruta.length>0 && this.recorridoForm.valid){
      this.recorrido.numrec = this.recorridoForm.value.numrec;
      this.recorrido.nombrerec = this.recorridoForm.value.nombrerec;
      this.recorrido.fecharec = this.recorridoForm.value.fecharec;
      this.recorrido.horarec = this.recorridoForm.value.horarec;
      this.recorrido.preciorec = this.recorridoForm.value.preciorec;
      this.recorrido.descripcion= this.recorridoForm.value.descripcion;
      this.recorrido.idbus = this.recorridoForm.value.idbus;
      console.log(this.recorrido);
      this.recorridoService.guardarRecorrido(this.recorrido).subscribe({
        next:async (res)=>{
          this.recorrido=res;
          await this.guardarDetalleRecorrido(this.recorrido);
          //alert(res.message);
          this.toast.success({detail:"Registrado!",summary: "por fin", duration: 5000});//toast de error al iniciar sesión
          
        },
        error:(err)=>{
          this.toast.error({detail:"Ups!",summary: err.error.message, duration: 5000}); 
        }
      })
    }else{
      this.toast.error({detail:"Ups!",summary: "Ingrese todos los campos y la ruta", duration: 5000});
    }

   
    
  }

  
  async guardarDetalleRecorrido(recorrido:Recorrido){
    /*
    this.ruta.forEach((data: { longitud:string; latitud:string })=>{
      this.rd.idRec=recorrido.idRec;
      this.rd.longitud=data.longitud.toString();
      this.rd.latitud=data.latitud.toString();
      console.log(this.rd)
      this.recorridoDetalleService.guardarRecorridoDetalle(this.rd).subscribe({
        next:(res)=>{
          this.toast.success({detail:"Bien!",summary: "se guardó la ruta", duration: 5000});
        }
      }
      )
    })*/

for(var i=0;i<this.ruta.length;i++){
  let rd: RecorridoDetalle=new RecorridoDetalle();
  rd.idRec=recorrido.idRec;
  rd.longitud=this.ruta[i].longitud.toString();
  rd.latitud=this.ruta[i].latitud.toString();
  await this.recorridoDetalleService.guardarRecorridoDetalle(rd).subscribe({
    next:(res)=>{
      this.toast.success({detail:"Bien!",summary: "se guardó la ruta", duration: 5000});
      this.recorridoForm.reset();
      this.limpiarRuta();
    }
  }
  )
}


  }
  

}
