import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Buseta } from 'src/app/models/buseta.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { BusetaService } from 'src/app/services/buseta.service';
import { UserHomeService } from 'src/app/services/user-home.service';

@Component({
  selector: 'app-busetas',
  templateUrl: './busetas.component.html',
  styleUrls: ['./busetas.component.css']
})
export class BusetasComponent implements OnInit {

  busetaForm!: FormGroup;
  public previsualizacion!:string;//para la imagen
  public archivos: any=[]; //array para la imagen

  public buseta!: Buseta; //objeto para el registro
  public usuario!:Usuario;
  public cardBuseta:any=[];

  public idBusetaEliminada!:number;

  constructor(private busetaService: BusetaService, private userHome: UserHomeService, private auth: AuthService, private fb: FormBuilder, private toast: NgToastService, private router: Router, private sanitizer :DomSanitizer){
    
    this.buseta=new Buseta();
    this.usuario=new Usuario();
    this.userHome.getIdFromStore().subscribe(val=>{
      const idFromToken = this.auth.getIdFromToken();
      this.buseta.idusu=val||idFromToken;
    })

    //this.usuario.iduser=this.buseta.idusu

  };

  ngOnInit(): void {
    this.busetaForm=this.fb.group({
      placa:['',Validators.required],
      capacidad:['',Validators.required],
      modelo:['',Validators.required],
      anio:['',Validators.required],
      idusu:this.buseta.idusu
    })

    this.busetaService.ListarBusetasUsuario(this.buseta.idusu).subscribe(res=>{
      
      //parseInt(res.Telefono);
      this.cardBuseta=res;
      //console.log(this.cardBuseta);
      //parseInt(this.transportistas.Telefono)
    })
    
  }

registrarBuseta(){
    if(this.busetaForm.valid){
      this.buseta.placa=this.busetaForm.value.placa;
      this.buseta.capacidad=parseInt(this.busetaForm.value.capacidad);
     this. buseta.modelo=this.busetaForm.value.modelo;
      this.buseta.anio=parseInt(this.busetaForm.value.anio);
      //console.log(this.buseta)
      this.busetaService.registrarBuseta(this.buseta).subscribe({
        next:(res)=>{
          this.toast.success({detail:"Registrado!",summary: "Se añadió con éxito", duration: 5000});//toast de error al iniciar sesión
          this.busetaForm.reset();//esta linea sirve para que los campos del formulario se vacien cuando se registra un usuario
          this.busetaService.ListarBusetasUsuario(this.buseta.idusu).subscribe(res=>{
            this.cardBuseta=res;
            console.log(this.cardBuseta);
          })
        },
        error:(err)=>{
          this.toast.error({detail:"Ups!",summary: "Algo pasó", duration: 5000}); 
        }
      })
    }else{
      this.toast.error({detail:"Ups!",summary: "Ingrese todos los campos", duration: 5000});
    }
  }



  capturarID(id: number){//este metodo captura el id de la buseta que se va a borrar del html
    this.idBusetaEliminada=id
    //console.log(this.idBusetaEliminada)
  }

  eliminarBuseta(){
    this.capturarID(this.idBusetaEliminada)
    console.log(this.idBusetaEliminada)
    this.busetaService.eliminarBusetaUsuario(this.idBusetaEliminada).subscribe({
      next:(res)=>{
        this.toast.success({detail:"Borrado!",summary: "Se borró la buseta", duration: 5000});
        this.busetaService.ListarBusetasUsuario(this.buseta.idusu).subscribe(res=>{
          this.cardBuseta=res;
          //console.log(this.cardBuseta);
      const buttonRef=document.getElementById("closeBtn");
      buttonRef?.click();
        })
      },
      error:(err)=>{
        this.toast.error({detail:"Ups!",summary: "Algo pasó", duration: 5000}); 
      }
    })
  }
  
  capturarImagen(event:any){
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
      this.previsualizacion=imagen.base;
      console.log(imagen);
    })
    //this.archivos.push(archivoCapturado);
    //event.target.files
  }

  extraerBase64 = async($event:any)=> new Promise((resolve,reject)=>{
    
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader= new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base:reader.result
        });
      };
      reader.onerror= error =>{
        resolve({
          blob: $event,
          image,
          base:null
        });
      }
      
    
  })

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      } else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

  
}
