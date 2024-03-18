import { NavComponent } from './../../../components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { Router } from '@angular/router';
import { PlayerPointRes } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent implements OnInit  {
isLoading : boolean = false;
tournamentName: string  = "string"
leadBoard!: PlayerPointRes
isTournamentFinished : boolean = false
player: any[] = []
constructor(private tournamentSv: TournamentService, private router: Router){}

ngOnInit(): void {
  this.getClassificaMvp()
}


getClassificaMvp() {
  this.tournamentSv.getClassificaMvp("string").subscribe(
    (data: PlayerPointRes) => {
      if (data.playerPointsList) {
        this.router.navigate(['/tournament'])
        Swal.fire("La classifica sarà disponibile una volta iniziato il torneo")
        this.isLoading = false
      }
      this.leadBoard = data;
      this.player = this.leadBoard?.playerPointsList || [];
      this.isLoading = false;
      this.checkIfTournamentisFinished();
    },
    (error) => {
      Swal.fire('Errore durante il recupero dei dati della classifica ', error);
      this.isLoading = false;
    }
  );
}

checkIfTournamentisFinished() {
  this.isLoading = true;
  this.tournamentSv.getAllGameFromTournamentName(this.tournamentName).subscribe((data) => {
    data.forEach((game) => {
      if (game.round === "FINAL" && game.status === "FINISHED") {
        this.isTournamentFinished = true;
        this.isLoading = false;
      } else {
        this.isTournamentFinished = false;
        this.isLoading = false;
      }
    });
  },
  (error) =>{
    Swal.fire(error.error.message)
    this.isLoading = false
  });
}


}
