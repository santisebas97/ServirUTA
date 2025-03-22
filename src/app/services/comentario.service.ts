import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url:string= "https://santiago1997-002-site1.ktempurl.com/api/Comentario";
  constructor(private http:HttpClient) { }

  obtenerComentarios(){
    return this.http.get<Comentario>(`${this.url}`);
  }

  guardarComentario(com: Comentario){
    return this.http.post<Comentario>(`${this.url}/registrarcomentario`,com);
  }
}
