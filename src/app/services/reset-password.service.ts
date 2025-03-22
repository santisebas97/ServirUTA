import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private url: string="https://santiago1997-002-site1.ktempurl.com/api/Usuario";
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email:string){
    return this.http.post<any>(`${this.url}/send-reset-email/${email}`,{});
  }

  resetPassword(resetPasswordObj: resetPassword){
    return this.http.post<any>(`${this.url}/reset-password`,resetPasswordObj);
  }
}
