import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecorridosComponent } from './recorridos/recorridos.component';
import { TransportistasComponent } from './transportistas/transportistas.component';
import { AuthGuard } from '../guards/auth.guard';
import { BusetasComponent } from './busetas/busetas.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaEstudiantesComponent } from './reserva-estudiantes/reserva-estudiantes.component';
import { MisrutasComponent } from './misrutas/misrutas.component';

const routes:Routes=[ //si creo mas componentes en el dash debo crear las rutas acá
  {path:'home', component:PagesComponent,
  children:[
    {path:'',component:DashboardComponent, data:{titulo:'Bienvenido'}}, //está vacio porque es una ruta hija. si escribo dashboard en la url se irá al dash, si esta dash/recorridos se irá a recorridos
    {path:'recorridos',component:RecorridosComponent, data:{titulo:'Recorridos'}},
    {path:'transportistas',component:TransportistasComponent, data:{titulo:'Transportistas'}},
    {path:'busetas',component:BusetasComponent, data:{titulo:'Busetas'}},
    {path:'reservas',component:ReservasComponent, data:{titulo:'Reservas'}},
    {path:'reservasestudiantes',component:ReservaEstudiantesComponent, data:{titulo:'Mis reservas'}},
    {path:'misrutas',component:MisrutasComponent, data:{titulo:'Mis rutas creadas'}},
  ],canActivate:[AuthGuard]

}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) // importar el router module para que funcionen las rutas hijas
  ],
  exports:[
    RouterModule //se debe exportar el routermodule de las rutas hijas. Despues de hacer las rutas hijas debemos ir a pages.component.html a agregar los router-outlets
  ]
})
export class PagesRoutingModule { }
