import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recorrido } from '../models/recorrido.model';

@Injectable({
  providedIn: 'root'
})
export class RecorridosService {

  private url:string= "https://santiago1997-002-site1.ktempurl.com/api/Recorrido"; 
  constructor(private http: HttpClient) {

   }

   obtenerRecorridos(){
    return this.http.get<Recorrido>(this.url);
   }

   obtenerRecorridosId(id:number){
    return this.http.get<Recorrido>(`${this.url}/${id}`);
   }


   guardarRecorrido(recorrido:Recorrido){
    return this.http.post<Recorrido>(`${this.url}/guardarrecorrido`,recorrido)
   }

   obtenerRecorridosUsuario(id:number){
    return this.http.get<Recorrido>(`${this.url}/obtenerrecorridousuario/${id}`);
   }

   eliminarRecorrido(id:number){
    return this.http.delete<boolean>(`${this.url}/${id}`);
   }
}
