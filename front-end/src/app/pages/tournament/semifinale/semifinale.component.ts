import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  tournamentString: string = 'string'; //da passare dinamicamente
  matches: Game[] = [];

  constructor(
    private tournamentSv: TournamentService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.isLoading = true
      this.tournamentSv.getAllGameFromTournamentName(this.tournamentString)
        .subscribe(games =>{
          games.forEach(game =>{
            if (game.round !== "QUARTERFINAL" && game.round !== "OCTAVEFINAL" && game.round !== "SEMIFINAL") {
              Swal.fire("Il torneo è finito oppure si deve giocare la finale")
              this.router.navigate(['/tournament/finale'])
              this.isLoading = false

            }
            if (game.round === "OCTAVEFINAL") {
              Swal.fire("Siamo arrivati agli ottavi").then(() => this.router.navigate(['/tournament/ottavi-finale']))
              this.isLoading = false

            }
            if (game.round === "QUARTERFINAL" && game.status !== "FINISHED") {
              Swal.fire("Siamo arrivati ai quarti").then(() => this.router.navigate(['/tournament/quarti-finale']))
              this.isLoading = false
            }
            if (game.round === "QUARTERFINAL" && game.status === "FINISHED") {
              this.tournamentSv.generateSemiFinale(this.tournamentString)
                .subscribe(data =>{
                 this.matches = data
                 this.isLoading = false
                },
                (err)=> {
                  Swal.fire(err.error.message)
                 this.isLoading = false
                })
            }
          })
          this.matches = games
          this.isLoading = false
    })
  }
}
