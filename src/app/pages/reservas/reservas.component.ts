import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Comentario } from 'src/app/models/comentario.model';
import { Recorrido } from 'src/app/models/recorrido.model';
import { RecorridoDetalle } from 'src/app/models/recorridodetalle.model';
import { Reserva } from 'src/app/models/reserva.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { BusetaService } from 'src/app/services/buseta.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { RecorridodetalleService } from 'src/app/services/recorridodetalle.service';
import { RecorridosService } from 'src/app/services/recorridos.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UserHomeService } from 'src/app/services/user-home.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit{



  mapa!: mapboxgl.Map;
  comentarioForm!: FormGroup; //el form del comentario
  comentario!:Comentario; // para el comentario
  public comentarios:any=[];
  public recorridos: any=[]; //para traer todos los recorridos registrados
  public idRecorridoReservado!:number;
  public cardBuseta:any=[];

  //variables que botengo de metodos
  estudiante: any=[];
  public recorrido: any=[];
  reserva!: Reserva;
  today=new Date();
  idchofer!:number;
  coordenada:any=[];

  constructor(private busetaService: BusetaService,private reservaService: ReservaService,private fb:FormBuilder, private recorridosService:RecorridosService,private recorridoDetalleService:RecorridodetalleService, private toast: NgToastService, private comentarioService: ComentarioService,private userHome: UserHomeService,private auth: AuthService){
    this.comentario=new Comentario();
    //this.estudiante=new Usuario();
    //this.chofer=new Usuario();
    //this.recorrido=new Recorrido();
    //this.reserva=new Reserva();
    this.comentarioForm=this.fb.group({
      comentarioj:['',Validators.required],
    })

    this.userHome.getIdFromStore().subscribe(val=>{
      const idFromToken = this.auth.getIdFromToken();
      this.comentario.idusu=val||idFromToken;
    })

  }

  
  ngOnInit(): void {
    this.recorridosService.obtenerRecorridos().subscribe(res=>{
      
      
      this.recorridos=res;
      console.log(this.recorridos);
      //this.cargarBuseta(this.recorridos.idBus);
      this.recorridos.forEach((data: { idBus: number; })=>{
        this.busetaService.ListarBusetasUsuario(data.idBus).subscribe(res=>{
          this.cardBuseta=res;
          console.log(this.cardBuseta)
        })
      })
    })
    this.comentarioService.obtenerComentarios().subscribe(res=>{
      this.comentarios=res;
    })
    this.cargarMapa();

    
    
  }



  cargarMapa(){
    
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoic2FudGlzZWJhczk3IiwiYSI6ImNscjhuY2VrdzJxNnQycXBhcXZqZ3E0ZXAifQ.GRXeJxMpdZFa5DMhOBIf5w';
    this.mapa = new mapboxgl.Map({
    container: 'mapa', // container ID id del nombre del div que contiene el mapa
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
   center: [-78.625736,-1.2690819], // starting position [lng, lat] //this.placesService.userLocation,
    zoom: 16.6,});
    
    }

  capturarIdRec(id:number){
    this.idRecorridoReservado=id
  }


  guardarComentario(){
    if(this.comentarioForm.valid){
      this.comentario.comentario1= this.comentarioForm.value.comentarioj;
      console.log(this.comentario)
      this.comentarioService.guardarComentario(this.comentario).subscribe({
        next:(res)=>{
          this.toast.success({detail:"Ok!",summary: "Se agregó tu comentario", duration: 5000});//toast de error al iniciar sesión
          this.comentarioForm.reset()
          this.comentarioService.obtenerComentarios().subscribe(res=>{
            this.comentarios=res;
          })
        },
          error:(err)=>{
            this.toast.error({detail:"Ups!",summary: err.error.message, duration: 5000}); 
          }
      })
    }else{
      this.toast.error({detail:"Ups!",summary: "Escribe un comentario primero", duration: 5000});//toast de error al iniciar sesión
    }
    
  }

  crearReserva(){
    this.reserva=new Reserva();
    this.capturarIdRec(this.idRecorridoReservado);
    //this.obtenerRecorrido(this.idRecorridoReservado);
    this.reserva.fechares= this.today.toLocaleDateString('en-UD');
    this.reserva.idusu=this.comentario.idusu
    this.recorridosService.obtenerRecorridosId(this.idRecorridoReservado).subscribe({next:(res)=>{
      this.recorrido=res;
      this.reserva.idrec=this.recorrido[0].idRec
      this.reserva.horarec=this.recorrido[0].horaRec
      this.reserva.nombrerec=this.recorrido[0].nombreRec
      this.reserva.idconductor=this.recorrido[0].idUsu
      this.auth.obtenerUsuarioId(this.comentario.idusu).subscribe({next:(res)=>{
        this.estudiante=res;
        this.reserva.nombreest=this.estudiante[0].nombre
        this.reserva.telefonoest=this.estudiante[0].telefono
        this.reservaService.agregarReserva(this.reserva).subscribe({
          next:(res)=>{
            this.toast.success({detail:"Ok!",summary: "Se notificó tu reserva al conductor", duration: 5000});//toast de error al iniciar sesión
          },
            error:(err)=>{
              this.toast.error({detail:"Ups!",summary: err.error.message, duration: 5000}); 
            }
        })
        const buttonRef=document.getElementById("closeBtn");
        buttonRef?.click();
      }})
    }})
  }

  mostrarRuta(id:number){
    this.idRecorridoReservado=id
    if(this.mapa.getLayer('route')){
      this.mapa.removeLayer('route'); 
    }
    if(this.mapa.getSource('route')){
      this.mapa.removeSource('route'); 
    }

    let ubicacion: [number, number][]=[]

    this.recorridoDetalleService.obtenerCoordenadasRecorrido(this.idRecorridoReservado).subscribe({next:(res)=>{
      this.coordenada=res;
      console.log(this.coordenada);
      if(this.coordenada.length>0){
        this.coordenada.forEach((x: { longitud: string | number; latitud: string | number; })=>{
          let position:[number,number]=[+x.longitud,+x.latitud];
          ubicacion.push(position);
          
        })
        this.mapa.addSource('route',{
          'type': 'geojson',
          'data':{
            'type':'FeatureCollection',
            'features':[
              {
                'type': 'Feature',
            'properties':{},
            'geometry':{
              'type': 'LineString',
              'coordinates': ubicacion
            }
              }
            ]
          }
        });
        this.mapa.addLayer({
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
    }})

    
  }

 
  
  private validateAllFormFields(formGroup: FormGroup){ //metodo para validar los controls del form
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }


}
