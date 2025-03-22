import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService){

  }

  ngOnInit():void{
    this.registerForm=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      telefono:['',Validators.required],
      direccion:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      passwd:['',Validators.required],
      rol:['',Validators.required]
    })
  }
  
  EsconderContrasena(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text": this.type="password";
  }

  onRegister(){
    if(this.registerForm.valid){//enviar el objeto a la base de datos
      this.auth.register(this.registerForm.value).subscribe({
        next:(res)=>{
          //alert(res.message);
          this.toast.success({detail:"Registrado!",summary: res.message, duration: 5000});//toast de error al iniciar sesión
          this.registerForm.reset();//esta linea sirve para que los campos del formulario se vacien cuando se registra un usuario
          this.router.navigate(['login']); //dirigirnos al login
        },
        error:(err)=>{
          this.toast.error({detail:"Ups!",summary: err.error.message, duration: 5000}); 
        }
      })
    }else{
      this.toast.error({detail:"Ups!",summary: "Ingrese todos los campos", duration: 5000});
    }
  }

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
