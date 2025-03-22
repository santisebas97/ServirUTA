import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {

  } //inyectamos el authservice para usar el metodo getToken

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.auth.getToken();//aqui obtenemos el token del localstorage con el metodo getToken que creamos
    if(myToken){//si existe un token se modifica y se agrega al header
      request=request.clone({//clonamos el request para enviar con el token en el header y enviar el clonado
        setHeaders:{Authorization: `Bearer ${myToken}` } //bearer + el token
      })
    }

    return next.handle(request)/*.pipe( //aqui se envia el request modificado al backend (el pipe es para refrescar el token pero no lo uso) - despues ir a appmodule (providers)
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.toast.warning({detail:"Sesión caducada", summary:"Inicie sesión otra vez"});//expira el token
            this.router.navigate(['login']);
          }

        }
        return throwError(()=> new Error("Algo pasó"));
      })
    );
    //despues de modificar hay que usarlo, para eso ir a appmodule*/
  }
}
