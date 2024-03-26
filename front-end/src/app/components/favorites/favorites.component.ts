import { User } from './../../api/models';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Tournament } from '../../api/models';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  private userSv = inject(UserService)
  private route = inject(ActivatedRoute)

  favoriteTournaments: Tournament[] = [];
  username :string|null = this.route.snapshot.paramMap.get('username');
  isLoading:boolean = false

  ngOnInit(): void {
    this.isLoading = true;
    if (this.username) {
      this.userSv.getUserByUsername(this.username).subscribe((user:User) =>{
        if (user.favoriteTournaments) {
          this.isLoading = false;
          this.favoriteTournaments = user.favoriteTournaments
        }
        this.isLoading = false;
      },
      (error) =>{
        this.isLoading = false;
        Swal.fire("Error", error.error.message, "error")
      })
    }
  }


  remove(tournamentName:string |undefined){
    this.isLoading = true;
    if (tournamentName && this.username) {
      this.userSv.removeToFavorite(this.username, tournamentName).subscribe(res =>{
        this.isLoading = false;
        const index = this.favoriteTournaments.findIndex(tournament => tournament.name === tournamentName);
        if (index !== -1) {
          this.favoriteTournaments.splice(index, 1);
        }
        Swal.fire("Success", `Il torneo ${tournamentName} è stato rimosso corrrettamente`, "success")
      },(error) =>{
        this.isLoading = false;
        Swal.fire("Error", error.error.message, "error")
      })
    }
  }
}
