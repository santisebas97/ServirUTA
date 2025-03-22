import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private url:string= "https://santiago1997-002-site1.ktempurl.com/api/Reserva"; 
  constructor(private http: HttpClient) {

   }

   ListarBusetasUsuario(id:number){
    return this.http.get<Reserva>(`${this.url}/${id}`);
  }

   agregarReserva(reserva: Reserva){
    return this.http.post<Reserva>(`${this.url}/reserva`,reserva)
   }

   eliminarReservaUsuario(id: number){
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

}
