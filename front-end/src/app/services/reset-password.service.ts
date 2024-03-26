import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPassword } from '../api/models/reset-password';
import { ConfirmRes } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  url:string = environment.url
  private http = inject(HttpClient)

  constructor() { }

  forgotPassword(email:string):Observable<ConfirmRes>{
    return this.http.put<ConfirmRes>(`${this.url}/auth/forgot-password?email=${email}`,{})
  }
  resetPassword(email:string, resetPassword:ResetPassword):Observable<ConfirmRes>{
    return this.http.put<ConfirmRes>(`${this.url}/auth/set-password?email=${email}`,resetPassword)
  }

}
