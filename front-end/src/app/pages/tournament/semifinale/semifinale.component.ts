import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { Game } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semifinale',
  templateUrl: './semifinale.component.html',
  styleUrl: './semifinale.component.scss'
})
export class SemifinaleComponent implements OnInit  {
  isLoading: boolean = false;
  private route = inject(ActivatedRoute);

  tournamentString: string | null =this.route.snapshot.paramMap.get('name');
  matches: Game[] = [];

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

    ngOnInit(): void {
      if (this.tournamentString) {
     this.isLoading = true
      this.tournamentSv.getAllGameFromTournamentName(this.tournamentString)
        .subscribe(games =>{
          if (games.length === 0) {
            Swal.fire("Il torneo non è ancora iniziato")
            this.router.navigate(['/tournament/'+this.tournamentString])
            this.isLoading = false

          }
          games.forEach(game =>{
            if (game.round !== "QUARTERFINAL" && game.round !== "OCTAVEFINAL" && game.round !== "SEMIFINAL") {
              Swal.fire("Il torneo è finito oppure si deve giocare la finale")
              this.router.navigate([`/tournament/${this.tournamentString}/finale`])
              this.isLoading = false

            }
            if (game.round === "OCTAVEFINAL") {
              Swal.fire("Siamo arrivati agli ottavi").then(() => this.router.navigate([`/tournament/${this.tournamentString}/ottavi-finale`]))
              this.isLoading = false

            }
            if (game.round === "QUARTERFINAL" && game.status !== "FINISHED") {
              Swal.fire("Siamo arrivati ai quarti").then(() => this.router.navigate([`/tournament/${this.tournamentString}/quarti-finale`]))
              this.isLoading = false
            }
            if (game.round === "QUARTERFINAL" && game.status === "FINISHED" && this.tournamentString) {
              this.tournamentSv.generateSemiFinale(this.tournamentString)
                .subscribe((data) =>{
                 this.matches = data
                 this.isLoading = false
                },
                (err)=> {
                  Swal.fire(err.error.message)
                 this.isLoading = false
                 this.router.navigate(['/tournament/'+this.tournamentString])
                },
                )
              }
            })
            this.matches = games
            this.isLoading = false
          },
          (error) =>{
            Swal.fire (error.error.message)
            this.isLoading = false
            this.router.navigate(['/tournament/'+this.tournamentString])
    })
  }
  this.isLoading = false;
  this.router.navigate(['/'])
}
}
