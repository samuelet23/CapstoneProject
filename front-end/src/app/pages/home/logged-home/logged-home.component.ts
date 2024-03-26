import { Component, inject } from '@angular/core';
import { PlaceService } from '../../../services/place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Province } from '../../../api/models';

@Component({
  selector: 'app-logged-home',
  templateUrl: './logged-home.component.html',
  styleUrl: './logged-home.component.scss'
})
export class LoggedHomeComponent {
private route  = inject(ActivatedRoute)


username:string|null =  this.route.snapshot.paramMap.get('username')

ngOnInit(){
  if (!this.username) {

    const googleUser = sessionStorage.getItem("googleUser");
    if (googleUser) {
      const user = JSON.parse(googleUser);
      this.username = user.name;
    }
  }
}
}

