import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../../services/place.service';
import { TournamentService } from '../../../services/tournament.service';
import { Province, Tournament } from '../../../api/models';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { myAuthService } from '../../../services/myAuth.service';

@Component({
  selector: 'app-province-tournament',
  templateUrl: './province-tournament.component.html',
  styleUrl: './province-tournament.component.scss'
})
export class ProvinceTournamentComponent{
  private location  = inject(Location)
  private auth = inject(myAuthService)
  private route = inject(ActivatedRoute)
  private tournamentSv = inject(TournamentService)
  provinces: Province[] = [];
  tournaments:Tournament[] =[]
  province:string | null = this.route.snapshot.paramMap.get('name')
  isManagerOrCoordinator:boolean = false
      isLoading: boolean = false
  ngOnInit(){
    this.auth.getUserRole$().subscribe(role =>{
      if (role === "MANAGER" || role === "COORDINATOR" ) {
        this.isManagerOrCoordinator = true;
      }
    })


    if (this.province) {

      this.isLoading = true;
      this.tournamentSv.getAllTournamentFromProvinceName(this.province.toLowerCase()).subscribe((tournaments) =>{

        this.tournaments = tournaments
        this.isLoading = false;
      },
      (error) =>{
        Swal.fire("Non ci sono tornei disponibili")
        this.location.back();
      })
    }
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
