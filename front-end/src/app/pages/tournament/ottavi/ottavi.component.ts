import Swal from 'sweetalert2';
import { Game } from '../../../api/models';
import { TournamentService } from '../../../services/tournament.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ottavi',
  templateUrl: './ottavi.component.html',
  styleUrl: './ottavi.component.scss',
})
export class OttaviComponent implements OnInit {
  isLoading: boolean = false;

  tournamentString: string = 'string'; //da passare dinamicamente
  games: Game[] = [];

  constructor(private tournamentSv: TournamentService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true
    this.tournamentSv
      .getAllGameFromTournamentName(this.tournamentString)
      .subscribe((res: Game[]) => {
        if (res.length > 0) {
          res.forEach((game) => {
            if (game.round === "FINAL" && game.status !== "FINISHED") {
              Swal.fire("Ecco a te la finale del torneo. Sta per iniziare!").then(() =>{
                this.router.navigate(['/tournament/finale'])
              })
              this.isLoading = false
            }
            if (game.round === "FINAL" && game.status === "FINISHED") {
              Swal.fire("Il torneo è finito!! Scopri chi è il vincitore. ").then(() =>{
                this.router.navigate(['/tournament/finale'])
              })
              this.isLoading = false
            }

            if (game.round!== "OCTAVEFINAL") {
              Swal.fire("Gli ottavi sono stati già giocati")
              this.router.navigate(['/tournament'])
              this.isLoading = false
            }
          })
          this.games = res;
          this.isLoading = false
        } else {
          this.tournamentSv
            .generateOttavi(this.tournamentString)
            .subscribe((res: Game[]) => {
              this.games = res;
              this.isLoading = false
            },
            (error) =>{
              Swal.fire(error.error.message)
              this.isLoading = false;
              this.router.navigate(['/tournament'])
            });
        }
      },(error) =>{
        Swal.fire(error.error.message)
        this.isLoading = false;
        this.router.navigate(['/tournament'])
      });
  }
}
