import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

const routes:Routes=[

  {path:'login',component:LoginComponent}, //creamos las rutas para el modulo auth
  {path:'register',component:RegisterComponent},
  {path:'reset',component:ResetComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) //importamos routermodule para las rutas que creemos
  ],
  exports:[
    RouterModule //exportamos estas rutas para que otros modulos la utilicen ejem: app-routing.module
  ]
})
export class AuthRoutingModule { }
