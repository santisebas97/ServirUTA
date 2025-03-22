import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransportistasComponent } from './transportistas/transportistas.component';
import { RecorridosComponent } from './recorridos/recorridos.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BusetasComponent } from './busetas/busetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaEstudiantesComponent } from './reserva-estudiantes/reserva-estudiantes.component';
import { MisrutasComponent } from './misrutas/misrutas.component';



@NgModule({
  declarations: [ //aqui declaramos los componentes que va a tener la app
    DashboardComponent,
    TransportistasComponent,
    RecorridosComponent,
    PagesComponent,
    BusetasComponent,
    ReservasComponent,
    ReservaEstudiantesComponent,
    MisrutasComponent
  ],exports:[// se debe exportarlos tambien
    DashboardComponent,
    TransportistasComponent,
    RecorridosComponent,
    PagesComponent,
    BusetasComponent,
    ReservasComponent
  ],
  imports: [
    CommonModule,
    SharedModule, //se debe importar el sharedmodule para que se puedan compartir esos componentes entre nuestras paginas
    RouterModule,// para las rutas
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
