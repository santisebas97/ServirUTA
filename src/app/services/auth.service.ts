import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string="https://santiago1997-002-site1.ktempurl.com/api/Usuario/"
  private userPayload:any; //esta variable guarda el token


  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload=this.decodedToken();
  }

  obtenerUsuarioId(id: number){
    return this.http.get<any>(`${this.url}${id}`);
  }

  register(userObj:any){//metodo que recibe un objeto de tipo any(cualquiera)
    return this.http.post<any>(`${this.url}register`,userObj); //el register completa la url de la api porque asi está la url
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.url}authenticate`,loginObj);
  }

  
  //este metodo sirve para guardar el token en localstorage
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue) //token es el nombre que le pongo al token
  }

  //este metodo sirve para obtener el token del usuario logueado del localstorage y usarlo en el interceptor y abajo para decodificar el token
  getToken(){
    return localStorage.getItem('token')
  }

  //este metodo sirve para saber si el usuario esta logueado o no. Verifica si el token existe en el usuario y devuelve V o F
  isLoggedIn():boolean{
    return !!localStorage.getItem('token') //esto devuelve el token en formato string pero con !! lo convertimos a booleano
  }

  //metodo para cerrar sesion y quitar el token
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  

  //estos metodos se necesitan para descifrar el token
  //metodo para descrifrar el token de autenticacion con angular-jwt *esto devuelve el payload
  decodedToken(){
    const jwtHelper= new JwtHelperService();
    const token=this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  //metodo para obtener el nombre del token
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  //metodo para obtener el rol del token
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getIdFromToken(){
    if(this.userPayload){
      return this.userPayload.nameid;
    }
  }
  
}
