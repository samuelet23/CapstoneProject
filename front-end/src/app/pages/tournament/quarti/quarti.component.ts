import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { Game } from '../../../api/models';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quarti',
  templateUrl: './quarti.component.html',
  styleUrl: './quarti.component.scss',
})
export class QuartiComponent implements OnInit {
  isLoading: boolean = false;
  private route = inject(ActivatedRoute);

  tournamentString: string | null =this.route.snapshot.paramMap.get('name');
  games: Game[] = [];

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tournamentString) {
    this.isLoading = true;
    this.tournamentSv
      .getAllGameFromTournamentName(this.tournamentString)
      .subscribe((res: Game[]) => {
        if (res.length > 0) {
          res.forEach((game) => {
            if (game.status == 'FINISHED' && game.round === 'OCTAVEFINAL') {
              if (this.tournamentString) {

              this.tournamentSv
                .generateQuarti(this.tournamentString)
                .subscribe((res: Game[]) => {
                  this.games = res;
                  console.log(this.games, 'generati quarti');
                  this.isLoading = false;
                },
                (error) =>{
                  Swal.fire(error.error.message)
                  this.router.navigate(['/tournament/'+this.tournamentString])
                });
              }
            }
            if (game.round === "FINAL" && game.status !== "FINISHED") {
              Swal.fire("Ecco a te la finale del torneo. Sta per iniziare!").then(() =>{
                this.router.navigate([`/tournament/${this.tournamentString}/finale`])
              })
              this.isLoading = false
            }
            if (game.round === "FINAL" && game.status === "FINISHED") {
              Swal.fire("Il torneo è finito!! Scopri chi è il vincitore. ").then(() =>{
                this.router.navigate([`/tournament/${this.tournamentString}/finale`])
              })
              this.isLoading = false
            }
            if (game.status !== 'FINISHED' && game.round === 'OCTAVEFINAL') {
              Swal.fire(
                'Il torneo è appena iniziato, i quarti saranno disponibili una volta che tutte le partite degli ottavi sono state giocate'
              );
              this.router.navigate([`/tournament/${this.tournamentString}/ottavi-finale`]);
              this.isLoading = false;
            }
            if (game.round !== 'QUARTERFINAL' && game.round !== 'OCTAVEFINAL') {
              Swal.fire('I quarti sono stati già giocati');

              this.router.navigate(['/tournament/'+this.tournamentString]);

              this.isLoading = false;
            }
          });
          this.games = res;
          this.isLoading = false;
        } else {
          Swal.fire('Non puoi iniziare un torneo dai quarti');
          this.isLoading = false
          this.router.navigate(['/tournament/'+this.tournamentString])
        }
      },(error) =>{
        Swal.fire(error.error.message)
      });
  }
  this.isLoading = false;
  this.router.navigate(['/'])
}
}

