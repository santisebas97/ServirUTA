import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    RouterModule, //hay que importar esto para que el router link en los html funcionen
    ReactiveFormsModule, // esto se importa para hacer formularios reactivos y validaciones en el login y register
    FormsModule
  ]
})
export class AuthModule { }
