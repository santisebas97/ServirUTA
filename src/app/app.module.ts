import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule, //se declara el modulo auth en el modulo principal en imports, esto hay que exportar desde el modulo auth
    PagesModule,//se delcara aqui porque hace parte del modulo principal
    HttpClientModule, //se necesita importar esto en el modulo principal porque los servicios lo necesitan
    NgToastModule, //para las notificaciones toast
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, //importamos el prvide
    useClass:TokenInterceptor,//decimos que vamos a usar la clase que creamos para el interceptor
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
