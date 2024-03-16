import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { myAuthService } from './myAuth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  token!: string | null;
  constructor(private authSrv: myAuthService, private router: Router) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newRequest);
    } else {
      this.router.navigate(['/auth/login']);
      return next.handle(request);
    }
  }

}
