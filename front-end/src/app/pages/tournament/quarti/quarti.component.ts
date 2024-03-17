import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { Game } from '../../../api/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quarti',
  templateUrl: './quarti.component.html',
  styleUrl: './quarti.component.scss',
})
export class QuartiComponent implements OnInit {
  isLoading: boolean = false;

  tournamentString: string = 'string'; //da passare dinamicamente
  games: Game[] = [];

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.tournamentSv
      .getAllGameFromTournamentName(this.tournamentString)
      .subscribe((res: Game[]) => {
        if (res.length > 0) {
          res.forEach((game) => {
            if (game.status == 'FINISHED' && game.round === 'OCTAVEFINAL') {
              this.tournamentSv
                .generateQuarti(this.tournamentString)
                .subscribe((res: Game[]) => {
                  this.games = res;
                  console.log(this.games, 'generati quarti');
                  this.isLoading = false;
                });
            }
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
            if (game.status !== 'FINISHED' && game.round === 'OCTAVEFINAL') {
              Swal.fire(
                'Il torneo è appena iniziato, i quarti saranno disponibili una volta che tutte le partite degli ottavi sono state giocate'
              );
              this.router.navigate(['/tournament/ottavi-finale']);
              this.isLoading = false;
            }
            if (game.round !== 'QUARTERFINAL' && game.round !== 'OCTAVEFINAL') {
              Swal.fire('I quarti sono stati già giocati');

              this.router.navigate(['/tournament']);

              this.isLoading = false;
            }
          });
          this.games = res;
          this.isLoading = false;
        } else {
          Swal.fire('Non puoi iniziare un torneo dai quarti');
        }
      });
  }
}
