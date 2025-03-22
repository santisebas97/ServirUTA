import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transportista } from '../models/transportista.model';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private url:string="https://santiago1997-002-site1.ktempurl.com/api/Transportista"
  constructor(private http: HttpClient, private router: Router) { 

  }
  getTransportista(){
    return this.http.get<Transportista>(this.url);
  }

  
}
