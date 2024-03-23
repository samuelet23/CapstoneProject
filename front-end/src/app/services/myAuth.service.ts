import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { OpenGetService } from '../api/services';
import { AccessTokenRes, LoginDto, UpdatePasswordDto, User, UserDto } from '../api/models';
import { HttpClient } from '@angular/common/http';
import { UserToken } from '../api/models/access-token-res';

@Injectable({
  providedIn: 'root',
})
export class myAuthService {
  url: string = environment.url;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  userProfile!: UserToken;
  userLogged!: AccessTokenRes;

  private roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();

  private authSubject = new BehaviorSubject<null | AccessTokenRes>(null);
  user$ = this.authSubject.asObservable();

  jwtHelper = new JwtHelperService();
  timelogout: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.restore();
  }

  login(loginParams: LoginDto): Observable<AccessTokenRes> {
    return this.http.post<AccessTokenRes>(`${this.url}/auth/login`, loginParams).pipe(
      tap((data:AccessTokenRes)=>{
          this.isLoggedInSubject.next(true);
          this.authSubject.next(data)
          this.userLogged = data
          localStorage.setItem('string token', JSON.stringify(data.accessToken));
          localStorage.setItem('utente', JSON.stringify(data));
          // localStorage.setItem('role',(data.user.role));
          this.autologout(data);
          this.userProfile = data.user;
          console.log(data);

      })

    );
  }

  getUserDetails(): Observable<User> {
    const token = localStorage.getItem('string token');

    if (token) {
      const username = this.jwtHelper.decodeToken(token)?.sub;
      if (username) {
        return this.getUserByUsername(username);
      }
    }

    return throwError("Impossibile ottenere i dettagli dell'utente.");
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('string token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  signup(userDetails: UserDto) {
    return this.http.post<UserDto>(`${this.url}/auth/register`, userDetails);
  }



  restore() {
    const userLs = localStorage.getItem('utente');

    if (userLs) {
      const userData: AccessTokenRes = JSON.parse(userLs);
      const tokenExpired = this.jwtHelper.isTokenExpired(userData.accessToken);

      if (tokenExpired) {
        this.isLoggedInSubject.next(false);
        this.authSubject.next(userData);
        this.autologout(userData);
      } else{
        this.isLoggedInSubject.next(true);
      }
    }
  }

  logout() {
    localStorage.removeItem('utente');
    localStorage.removeItem('token');
    localStorage.removeItem('string token');
    this.router.navigate(['/auth/login']);
    this.authSubject.next(null);
    this.isLoggedInSubject.next(false);

    if (this.timelogout) {
      clearTimeout(this.timelogout);
    }
  }

  autologout(data: AccessTokenRes) {
    const expirationdate = this.jwtHelper.getTokenExpirationDate(
      data.accessToken
    ) as Date;

    const expirationMill = expirationdate.getTime() - new Date().getTime();
    this.timelogout = setTimeout(() => {
      this.logout();
    }, expirationMill);
  }

  getUserData(): UserToken {
    return this.userProfile;
  }




  protected getUserByUsername(username: string):Observable<User> {
    return this.http.get<User>(`${this.url}/user/get/byUsername/${username}`);
  }

}
