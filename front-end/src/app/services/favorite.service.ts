import { SwalService } from './swal.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private userSv = inject(UserService)
  private swalSv = inject(SwalService)

  private favoriteTournaments: string[] = [];
  favoriteTournaments$ = new BehaviorSubject<string[]>(this.favoriteTournaments);


  constructor() { }

  addToFavorites(tournamentName: string | undefined, user: User) {
    if (tournamentName) {
      this.userSv.addToFavorite(user.username, tournamentName).subscribe(
        () => {
          this.favoriteTournaments.push(tournamentName);
          this.favoriteTournaments$.next(this.favoriteTournaments);
          this.swalSv.success(`Torneo ${tournamentName} aggiunto correttamente ai preferiti`);
        },
        (error) => {
          this.swalSv.error(error.error.message);
        }
      );
    }
  }

  removeFromFavorites(tournamentName: string | undefined, user: User) {
    if (tournamentName) {
      this.userSv.removeToFavorite(user.username, tournamentName).subscribe(
        () => {
          this.favoriteTournaments = this.favoriteTournaments.filter(name => name !== tournamentName);
          this.favoriteTournaments$.next(this.favoriteTournaments);
          this.swalSv.success(`Il torneo ${tournamentName} è stato rimosso correttamente`);
        },
        (error) => {
          this.swalSv.error(error.error.message);
        }
      );
    }
  }
}
