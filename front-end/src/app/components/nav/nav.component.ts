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
  user!:User;
  isManager: boolean =false;
  isCoordinator: boolean = false;
  isLoggedIn: boolean = false;

  constructor() {
    const userData = localStorage.getItem('utente');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.getUserByUsername(this.username)
      this.user = user
    }

  }

  ngOnInit() {
    this.authSv.getUserRole$().subscribe(role =>{
      if (role === "MANAGER") {
        return this.isManager = true;
      }
      if (role === "COORDINATOR") {
        return this.isCoordinator = true;
      }
      return false
    })
this.authSv.isLoggedIn$.subscribe(loggedIn => {
  this.isLoggedIn = loggedIn
  if (!loggedIn) {
    this.isManager = false;
    this.isCoordinator = false;
  }
})

  }


getUserByUsername(username:string){
  this.userSv.getUserByUsername(username).subscribe((user)=>{
    console.log(user);

    this.user = user
  })
}

  protected toggleNav() {
    this.active = !this.active;
  }

  logout() {
    this.authSv.logout();
    this.active = !this.active;
  }
}
