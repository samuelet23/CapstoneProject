import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
active: boolean = false
isSticky = false;
links = [
  { title: 'Login', fragment: 'auth/login' },
  { title: 'Register', fragment: 'auth/register' }
];

constructor(public route: ActivatedRoute) {
}



protected toggleNav(){
  this.active = !this.active;
}

}
