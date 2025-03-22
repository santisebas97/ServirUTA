import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NgToastService } from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor( private auth: AuthService, private router: Router, private toast: NgToastService){

  }


  canActivate(): boolean{
    if(this.auth.isLoggedIn()){//el metodo islogged verifica si el usuario tiene un token (esta funcoin esta en auth.service)
      return true;
    }else{
      this.toast.error({detail:"Ups", summary:"Inicie sesión primero"})
      this.router.navigate(['login']);// si no tiene token le regresa al login
      return false;
    }
  }
}
