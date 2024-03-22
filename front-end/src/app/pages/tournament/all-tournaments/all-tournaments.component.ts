import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-tournaments',
  templateUrl: './all-tournaments.component.html',
  styleUrl: './all-tournaments.component.scss'
})
export class AllTournamentsComponent implements OnInit {
private tournamentSv = inject(TournamentService)
private route  = inject(ActivatedRoute)
private router  = inject(Router)
isLoading: boolean = false
isWithReferee:boolean = true
provinceName: string | null = this.route.snapshot.paramMap.get('provinceName');
tournaments:Tournament[] =[]

ngOnInit(): void {

  this.isLoading = true
  if (this.provinceName) {

    this.tournamentSv.getAllTournamentFromProvinceName(this.provinceName.toLowerCase()).subscribe((tournaments)=>{
      this.isLoading = false
      console.log(tournaments);

      if (tournaments.length > 0) {
        this.tournaments = tournaments
      } else{
        Swal.fire("Non ci sono tornei disponibili per questa città").then(() =>{
            this.router.navigate(['/'])
        })
      }
      this.isLoading = false

    },
    (error)=>{
      Swal.fire("Errore interno nel cercare i tornei per questà città")
    })

  }
}

isStarted(tournament: Tournament): boolean {
  return tournament.state === "STARTED"
}
isFinished(tournament: Tournament): boolean {
  return tournament.state === "FINISHED"
}


checkTheRefereeForTournament(tournament: Tournament): string {
  if (tournament.level == "JUNIOR") {
    if (tournament.referees?.length !== 1) {
      return "Aggiungi arbitro";
    } else {
      return "Inizia torneo";
    }
  }
  if (tournament.level == "RISINGSTARS") {
    if (tournament.referees?.length !== 2) {
      return "Aggiungi arbitro";
    } else {
      return "Inizia torneo";
    }
  }
  if (tournament.level == "ELITE") {
    if (tournament.referees?.length !== 3) {
      return "Aggiungi arbitro";
    } else {
      return "Inizia torneo";
    }
  }
  return "Livello torneo non valido";
}




}
