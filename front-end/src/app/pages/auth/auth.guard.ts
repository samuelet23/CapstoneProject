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
    return this.auth.getUserRole$().pipe(
      map(role => {
        if (role === 'MANAGER' ) {
          console.log(role);

          return true;
        } else if (role === 'CAPTAIN' && this.isCaptainRoute(state.url)) {
          console.log(role);
          return true;
        } else if (role === 'USER' && this.isUserRoute(state.url)) {
          console.log(role);
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          console.log(role);
          return false;
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  private isCaptainRoute(url: string): boolean {
    return url.startsWith('/captain');
  }

  private isUserRoute(url: string): boolean {
    return url.startsWith('/user');
  }

}
