import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserHomeService } from 'src/app/services/user-home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  type:string="password"; //pasa la propiedad password al type de la contraseña en el login
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"; //para el icono de ojo en la contraseña
  loginForm!: FormGroup; // el nombre del form para el login de tipo formgroup
  public resetPasswordEmail!:string; //para restablecer la contraseña
  public isValidEmail!:boolean;//para saber si el email ingresado en el modal es valido
  placesService: any;

  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router, private toast: NgToastService, private userHome: UserHomeService, private resetService: ResetPasswordService){ //el formbuilder es para formularios reactivos y lo estamos inyectando, el authservice es inyectado para el servicio auth,
    this.loginForm=this.fb.group({// hacer que el login sea igual al formBuilder del constructor
      email:['',[Validators.required,Validators.email]],
      passwd:['',Validators.required]
    })

    if(this.auth.isLoggedIn()){
      this.router.navigate(['home']);
    }
  }
  
  
  ngOnInit(): void {
    
  }

  //metodo para esconder y mostrar la contraseña en el login
  EsconderContrasena(){
    this.isText= !this.isText; //si el istext es falso lo convertimos en verdadero
    this.isText ? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash"; //si istext es verdadero y el icono es el ojo cambiamos el icono al ojo con slash
    this.isText ? this.type="text": this.type="password"; //si es verdadero y la contraseña esta en tipo texto lo pasamos a tipo password
  }

  onLogin(){//metodo del boton ingresar que confirma si el formulario está correcto
    if(this.loginForm.valid){//enviar el objeto a la base de datos
      //console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          //alert(res.message);
          this.toast.success({detail:"Sesión iniciada",summary: res.message, duration: 5000});//toast de sesion exitosa
          this.loginForm.reset();
          this.auth.storeToken(res.token);//iniciada la sesión se guarda en local el token del response res.
          const tokenPayload=this.auth.decodedToken();//para que se actualice el nombre de usuario en el sidebar
          this.userHome.setFullnameForStore(tokenPayload.name);//nombre
          this.userHome.setRoleForStore(tokenPayload.role);//rol
          this.userHome.setIdForStore(tokenPayload.nameid);//id
          console.log(tokenPayload.nameid);
          this.router.navigate(['home'])
        },
        error:(err)=>{
          
          this.toast.error({detail:"Ups!",summary: err.error.message, duration: 5000}); 
        }
      })
    }else{
      
      this.toast.error({detail:"Ups!",summary: "Ingrese todos los campos", duration: 5000});//toast de error al no ingresar nada en el formulario
    }
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

  checkValidEmail(event: string){//funcion para saber si el email del modal es valido
    const value= event;
    const pattern= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/; //sirve para comparar lo que traigo del evento y saber si es un correo valido
    this.isValidEmail=pattern.test(value);
    return this.isValidEmail;
  }
  
  confirmToSend(){//metodo del boton confirmar email
    if(this.checkValidEmail(this.resetPasswordEmail)){
      
      //hacer el llamado a la API
  
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          this.toast.success({
            detail: 'ÉXITO',
            summary:'Correo enviado',
            duration:3000,
          });
          this.resetPasswordEmail="";//reseteamos el email ingresado
      const buttonRef=document.getElementById("closeBtn");
      buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({
            detail: 'ERROR',
            summary:'Algo ha ido mal',
            duration:3000,
          });
        }
      });
    }
  }
  
}
