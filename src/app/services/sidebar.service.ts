import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menuEstudiantes:any[]=[{ //aqui se crea un menu que va a aparecer en el sidebar con todas las opciones de componentes que creemos
    titulo:'Inicio',
    icono:'nav-icon fas fa-home',
    submenu:[
      //{titulo:'Busetas', url:'busetas', icono:'fa fa-bus'},
      //{titulo:'Recorridos', url:'recorridos', icono:'fa fa-map'},
      {titulo:'Transportistas', url:'transportistas', icono:'fa fa-users'}, 
      {titulo:'Rutas Disponibles', url:'reservas', icono:'fa fa-map-marker'},
      //{titulo:'Mis Reservas', url:'reservasestudiantes', icono:'fa fa-tags'},  
]
}]

menuTransportistas:any[]=[{ //aqui se crea un menu que va a aparecer en el sidebar con todas las opciones de componentes que creemos
  titulo:'Inicio',
  icono:'nav-icon fas fa-home',
  submenu:[
    {titulo:'Busetas', url:'busetas', icono:'fa fa-bus'},
    {titulo:'Recorridos', url:'recorridos', icono:'fa fa-map'},
    //{titulo:'Transportistas', url:'transportistas', icono:'fa fa-users'}, 
    //{titulo:'Reservas', url:'reservas', icono:'fa fa-tag'},
    {titulo:'Mis Reservas', url:'reservasestudiantes', icono:'fa fa-tags'},  
    {titulo:'Mis Rutas creadas', url:'misrutas', icono:'fa fa-map-marker'},  
]
}]

/*
menuTransportistas:any[]=[{
  titulo:'Inicio',url:'dashboard',
  icono:'nav-icon fas fa-home',
  submenu:[
    {titulo:'Estudiantes', url:'estudiantes', icono:'fa fa-bus'},
    {titulo:'Recorridos', url:'recorridos', icono:'fa fa-tag'},
    {titulo:'Notificaciones', url:'notificaciones', icono:'fa fa-paper-plane'}
]
}]*/
  constructor() { }
}
