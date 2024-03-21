import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { myAuthService } from '../../services/myAuth.service';
import Swal from 'sweetalert2';

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
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401 && error.error.message === 'JWT expired') {
            Swal.fire("La tua sessione è scaduta, stai per essere reindirizzato alla pagina di login").then(() =>{
              this.router.navigate(['/auth/login'])
            })
          }
          return throwError(error);
        })
      );
    } else {
      this.router.navigate(['/auth/login']);
      return next.handle(request);
    }
  }
}
