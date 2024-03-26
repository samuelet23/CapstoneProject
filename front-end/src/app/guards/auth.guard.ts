import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { myAuthService } from '../services/myAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  private router = inject(Router)
  private auth = inject(myAuthService)

  constructor(){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.isLoggedIn$.pipe(map(isLoggedIn => {
        if(!isLoggedIn) this.router.navigate(['/auth/login']);

        return isLoggedIn
      }))

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }


  // return this.auth.isLoggedIn$.pipe(
  //   switchMap(isLoggedIn => {
  //     if (!isLoggedIn) {
  //       this.router.navigate(['/auth/login']);
  //       return Promise.resolve(false);
  //     }
  //     return this.auth.getUserRole$();
  //   }),
  //   map(role => {
  //     if (role === 'USER') {
  //       return true;
  //     } else {
  //       this.router.navigate(['/auth/login']);
  //       return false;
  //     }
  //   })
  // );


}
