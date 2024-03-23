import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { myAuthService } from '../../services/myAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router : Router, private auth: myAuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLoggedIn$.pipe(map(isLoggedIn =>{
      if (!isLoggedIn) {
        this.router.navigate(['/auth/login'])
      }
      return isLoggedIn
    })) ;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
