import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../api/models';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent implements OnInit  {
  private userSv = inject(UserService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private router = inject(Router);
  isLoading:boolean = false;
  username: string | null = this.route.snapshot.paramMap.get('username');
  user!:User

  ngOnInit(): void {
    this.isLoading = true
    if (this.username) {
      this.userSv.getUserByUsername(this.username).subscribe((user) => {
        this.user = user
        this.isLoading = false;
      },
      (error) =>{
        Swal.fire(error.error.message)
        this.isLoading = false;
      })
    }
  }

  goBack(){
    this.location.back()
  }
}
