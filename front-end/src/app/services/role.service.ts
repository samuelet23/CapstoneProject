import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userRole$ = new BehaviorSubject<string>('')

  constructor() { }


  setUserRole(role: string) {
    this.userRole$.next(role);
  }

getUserRole$(): Observable<string> {
  const role = localStorage.getItem('role');
  if (role) {
    this.userRole$.next(role);
  }
  return this.userRole$.asObservable();
}

}
