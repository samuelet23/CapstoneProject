import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Province, Tournament } from '../../../api/models';
import Swal from 'sweetalert2';
import { FilterService } from '../../../services/filter.service';
import { map } from 'rxjs';
import { PlaceService } from '../../../services/place.service';
import { Location } from '@angular/common';
import { myAuthService } from '../../../services/myAuth.service';

@Component({
  selector: 'app-all-tournaments',
  templateUrl: './all-tournaments.component.html',
  styleUrl: './all-tournaments.component.scss'
})
export class AllTournamentsComponent implements OnInit {
  private tournamentSv = inject(TournamentService)
private location  = inject(Location)
private auth  = inject(myAuthService)
private placeSv = inject(PlaceService)
private filterSv = inject(FilterService);

tournamentName: string = '';
cityName:string = ''
startDate: string = '';
tournamentState: string = '';
tournamentLevel: string = '';


isLoading: boolean = false
isWithReferee:boolean = true

isManagerOrCoordinator:boolean = false;

tournaments:Tournament[] =[]
provinces: Province[] = [];

ngOnInit(): void {

this.auth.getUserRole$().subscribe(role =>{

  if (role === "MANAGER" || role === "COORDINATOR" ){
    this.isManagerOrCoordinator = true;
    return;
  }

})

this.getAllProvince()
  this.isLoading = true
    this.tournamentSv.getAllTournaments().subscribe((tournaments)=>{
      this.isLoading = false

      if (tournaments.length > 0) {
        this.tournaments = tournaments
      } else{
        Swal.fire("Non ci sono tornei disponibili al momento").then(() =>{
            this.location.back()
        })
      }
      this.isLoading = false

    },
    (error)=>{
      Swal.fire("Errore interno nel cercare tutti i tornei")
    })


}

goBack(){
  this.location.back()
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
      return "Aggiungi Squadre";
    }
  }
  if (tournament.level == "RISINGSTARS") {
    if (tournament.referees?.length !== 2) {
      return "Aggiungi arbitro";
    } else {
      return "Aggiungi Squadre";
    }
  }
  if (tournament.level == "ELITE") {
    if (tournament.referees?.length !== 3) {
      return "Aggiungi arbitro";
    } else {
      return "Aggiungi Squadre";
    }
  }
  return "Livello torneo non valido";
}



getAllProvince() {
  this.placeSv.getAllProvince().subscribe((provinces: Province[]) => {
    this.provinces = provinces;
  },
  (error) =>{
    Swal.fire (error.error.message)
  });
}


filterTournaments() {

  this.isLoading = true;

  if (this.tournamentName) {
    this.filterSv.filterByName(this.tournamentName)
      .pipe(
        map((tournament: Tournament) => [tournament])
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.tournaments = res;
      },
      (error) =>{
        Swal.fire(error.error.message)
        this.isLoading = false;
      });
  } else if (this.startDate) {
    this.filterSv.filterByStarterDate(this.startDate).subscribe((tournaments) => {
      this.tournaments = tournaments;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  } else if (this.tournamentState === 'FINISHED') {
    this.filterSv.filterByFinishedTournament().subscribe((res) => {
      this.tournaments = res;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  } else if (this.tournamentState === 'STARTED') {
    this.filterSv.filterByStartedTournament().subscribe((res) => {
      this.tournaments = res;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  } else if (this.tournamentState === 'SCHEDULED') {
    this.filterSv.filterByScheduledTournament().subscribe((res) => {
      this.tournaments = res;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  } else if (this.tournamentLevel) {
    this.filterSv.filterByTournamentLevel(this.tournamentLevel).subscribe((res) => {
      this.tournaments = res;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  } else if (this.cityName) {
    this.tournamentSv.getAllTournamentFromProvinceName(this.cityName.toLowerCase()).subscribe((res) => {
      this.tournaments = res;
      this.isLoading = false;
    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
    });
  }
}


}
