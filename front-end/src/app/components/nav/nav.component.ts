import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myAuthService } from '../../services/myAuth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../api/models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private authSv = inject(myAuthService);
  private userSv = inject(UserService);

  active: boolean = false;
  isSticky: boolean = false;

  username: string = '';
  isManager: boolean = false;
  isCoordinator: boolean = false;
  isUser: boolean = false;
  isLoggedIn: boolean = false;
  isGoogleUser: boolean = false;
  constructor() {

  }

  ngOnInit() {

    const userLs= localStorage.getItem('utente')
    if (userLs) {
      const user = JSON.parse(userLs)
      this.username = user.username
    }

    this.authSv.getUserRole$().subscribe((role) => {
      if (role === 'MANAGER') {
        return (this.isManager = true);
      }
      else if (role === 'COORDINATOR') {
        return (this.isCoordinator = true);
      }
      else if (role === 'USER') {
        return (this.isUser = true);
      }
      return false;
    });
    this.authSv.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.isManager = false;
        this.isCoordinator = false;
      }
    });

    this.isGoogleUser = !!sessionStorage.getItem('googleUser');
    const userGoogle = sessionStorage.getItem('googleUser');
    if (userGoogle) {
      const user = JSON.parse(userGoogle)
      this.username = user.name.replace(/\s/g, '')
    }

  }


  protected toggleNav() {
    this.active = !this.active;
  }

  logout() {
    this.authSv.logout();
    this.active = !this.active;
  }
}
