import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  {path:'', redirectTo:'/login',pathMatch:'full'}, //patmatch significa quela url debe conicidir en este caso si no hay nada en la url nos dirigira al login
  {path:'**',component:NopagefoundComponent} //todas las url que no se encuentren se redirigiran a la pagina no pagefound

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true}),
  PagesRoutingModule, //se debe importar el ruteo de pages aca en el principal para que la app sepa las rutas de pages
AuthRoutingModule],// para saber las rutas en auth
  exports: [RouterModule]
})
export class AppRoutingModule { }
