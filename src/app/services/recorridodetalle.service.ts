import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecorridoDetalle } from '../models/recorridodetalle.model';

@Injectable({
  providedIn: 'root'
})
export class RecorridodetalleService {
  private url:string= "https://santiago1997-002-site1.ktempurl.com/api/Recorridodetalle"; 
  constructor(private http:HttpClient) { }

  guardarRecorridoDetalle(rd:RecorridoDetalle){
    return this.http.post<boolean>(`${this.url}/guardardetalle`,rd)
  }

  obtenerCoordenadasRecorrido(id:number){
    return this.http.get<RecorridoDetalle>(`${this.url}/${id}`)
  }

  eliminarRecorridoDetalle(id:number){
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
