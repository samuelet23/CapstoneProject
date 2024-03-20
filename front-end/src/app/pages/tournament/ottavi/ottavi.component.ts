import Swal from 'sweetalert2';
import { Game } from '../../../api/models';
import { TournamentService } from '../../../services/tournament.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ottavi',
  templateUrl: './ottavi.component.html',
  styleUrl: './ottavi.component.scss',
})
export class OttaviComponent implements OnInit {
  isLoading: boolean = false;

  private route = inject(ActivatedRoute);

  tournamentString:string | null = this.route.snapshot.paramMap.get('name')
  games: Game[] = [];

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {


    this.isLoading = true;
    if (this.tournamentString) {
      this.tournamentSv
        .getAllGameFromTournamentName(this.tournamentString)
        .subscribe(
          (res: Game[]) => {
            if (res.length > 0) {
              res.forEach((game) => {
                this.isLoading = false;
                if (game.round === 'FINAL' && game.status !== 'FINISHED') {
                  Swal.fire(
                    'Ecco a te la finale del torneo. Sta per iniziare!'
                  ).then(() => {
                    this.router.navigate([`/tournament/${this.tournamentString}/finale`]);
                  });
                  this.isLoading = false;
                }
                if (game.round === 'FINAL' && game.status === 'FINISHED') {
                  Swal.fire(
                    'Il torneo è finito!! Scopri chi è il vincitore. '
                  ).then(() => {
                    this.router.navigate([`/tournament/${this.tournamentString}/finale`]);
                  });
                  this.isLoading = false;
                }

                if (game.round !== 'OCTAVEFINAL') {
                  Swal.fire('Gli ottavi sono stati già giocati');
                  this.router.navigate(['/tournament/'+this.tournamentString]);
                  this.isLoading = false;
                }
              });
              this.games = res;
              this.isLoading = false;
            } else if (this.tournamentString) {
              this.tournamentSv.generateOttavi(this.tournamentString).subscribe(
                (res: Game[]) => {
                  this.games = res;
                  this.isLoading = false;
                },
                (err: any) =>{
                  Swal.fire(err.error.message)
                  this.isLoading = false;
                  this.router.navigate(['/tournament/'+this.tournamentString]);
                }
              );
              this.isLoading = false;
            }
          },
          (error) => {
            Swal.fire(error.error.message);
            this.isLoading = false;
          }
        );
    }
    this.isLoading = false;
    // this.router.navigate(['/'])


  }
}
