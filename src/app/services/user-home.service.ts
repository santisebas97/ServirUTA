import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHomeService {

  private Nombre$ = new BehaviorSubject<string>(""); //estan en signo de dolar porque se van a suscribir a los observables
  private role$ = new BehaviorSubject<string>("");
  private nameid$ = new BehaviorSubject<string>("");
  //public id!: string;
  constructor() { } //estos metodos deben crearse en el constructor para que se refresquen

  //aqui estan los metodos que uso para obtener el id, el nombre y el token del usuario que esta loguwado
  public getRoleFromStore(){ //para obtener el rol de local storage
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){ //para poner el rol donde queramos
    this.role$.next(role);
  }

  public getFullnameFromStore(){
    return this.Nombre$.asObservable();
  }

  public setFullnameForStore(nombre:string){
    this.Nombre$.next(nombre);
  }

  public getIdFromStore(){
    return this.nameid$.asObservable();
  }

  public setIdForStore(id:string){
    this.nameid$.next(id);
    return id
  }
}