import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { myAuthService } from '../services/myAuth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {


  private router = inject(Router)
  private auth = inject(myAuthService)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.getUserRole$().pipe(
        map(role => {
          if (role === 'MANAGER' ) {
            return true;
          } else if (role === 'COORDINATOR' && this.isCoordinatorRoute(state.url)) {
            return true;
          } else {
            this.router.navigate(['/auth/login']);
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

  private isCoordinatorRoute(url: string): boolean {
    return url.startsWith('/team'&&'/game');
  }

}
