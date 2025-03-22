import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recorrido } from '../models/recorrido.model';

@Injectable({
  providedIn: 'root'
})
export class ApirecorridoService {
  private url:string="https://santiago1997-002-site1.ktempurl.com/api/Recorrido/"

  constructor(private http: HttpClient) { }

  agregar(recorrido:Recorrido){
    return this.http.post<any>(`${this.url}guardarrecorrido`,recorrido);
  }
}
