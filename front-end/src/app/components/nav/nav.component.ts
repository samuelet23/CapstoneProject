import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myAuthService } from '../../services/myAuth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private authSv = inject(myAuthService);

  active: boolean = false;
  isSticky: boolean = false;
  isLoggedIn!: boolean ;
  username: string = '';

  constructor() {}

  ngOnInit() {

    this.authSv.isLoggedIn$.subscribe(loggedIn =>{
      this.isLoggedIn = loggedIn;
    })

    const userData = localStorage.getItem('utente');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
    }
  }

  protected toggleNav() {
    this.active = !this.active;
  }

  logout() {
    this.authSv.logout();
  }
}
