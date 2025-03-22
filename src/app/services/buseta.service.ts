import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buseta } from '../models/buseta.model';
import { Usuario } from '../models/usuario.model';
/*
const httpOption={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class BusetaService {
  private url:string= "https://santiago1997-002-site1.ktempurl.com/api/Buseta"; 
  constructor(private http: HttpClient, private router: Router) {
    
   }

  registrarBuseta(buseta : Buseta){//metodo que recibe un objeto de tipo any(cualquiera)
    return this.http.post<Buseta>(`${this.url}/registrar`,buseta); //el register completa la url de la api porque asi está la url
  }

  ListarBusetasUsuario(id:number){
    return this.http.get<Buseta>(`${this.url}/${id}`);
  }

  eliminarBusetaUsuario(id: number){
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
