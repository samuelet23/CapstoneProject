import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrl: './finale.component.scss',
})
export class FinaleComponent implements OnInit {
  isLoading: boolean = false;
  isFinished: boolean = false;
  private route = inject(ActivatedRoute)
  tournamentString:string | null = this.route.snapshot.paramMap.get('name')
  match: Game = {};

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tournamentString) {
          this.isLoading = true;
    this.tournamentSv
      .getAllGameFromTournamentName(this.tournamentString)
      .subscribe((games) => {
        if (games.length > 1) {
          games.forEach((game) => {
            if (game.winner) {
              this.isFinished = true;
              this.isLoading = false;
              return;
            }
            if (game.round === 'SEMIFINAL' && game.status === 'FINISHED' && this.tournamentString) {
              this.tournamentSv
                .generateFinale(this.tournamentString)
                .subscribe((game) => {
                  this.isLoading = false;
                  game = game;
                });
            }
            if (game.round === 'FINAL' && game.status === 'FINISHED') {
              this.isFinished = true;
              this.isLoading = false;
              return;
            } else {
              this.isLoading = false;
              Swal.fire('Il torneo non è ancora arrivato alle finale').then(
                () => this.router.navigate(['/tournament/'+this.tournamentString])
              );
            }
          });
        } else if (games.length === 1) {
          games.forEach((game) => {
            if (
              (game.round === 'FINAL' && game.status === 'FINISHED') ||
              game.winner
            )
            {

              this.match = game;
              this.isFinished = true;
              this.isLoading = false;

              return;
            }
            this.isLoading = false;
          });
        } else {
          Swal.fire('Il torneo non può iniziare dalla finale');
          this.isLoading = false;
          this.router.navigate(['/tournament/'+ this.tournamentString])
        }
      });
  }
  this.isLoading = false;
  this.router.navigate(['/'])
}
}
