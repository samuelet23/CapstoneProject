import { AccessTokenRes } from './../../api/models/access-token-res';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Team } from '../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss'
})
export class TournamentComponent implements OnInit{
  isLoading:boolean = false;
  teams:Team[] = []
  isCaptainOrManager:boolean = false;
  tournamentName:string = "string"
  dropdownOpen: boolean = false;

 constructor(private tournamentSv: TournamentService){
  this.isCaptainOrManagaer()
 }

 toggleDropdown(){
  this.dropdownOpen = !this.dropdownOpen
 }

 ngOnInit(): void {
  this.isLoading = true
   this.tournamentSv.getAllTeamFromTournament(this.tournamentName)
    .subscribe((team: Team[]) => {
      this.isLoading = false
     this.teams = team
    },
    (error) => {
      Swal.fire(error.error.message)
      this.isLoading = false
    }

    )
 }


 private isCaptainOrManagaer(): boolean {
  const userString = localStorage.getItem('utente');
  if (userString !== null) {
    const user = JSON.parse(userString);
    if (user.role === 'MANAGER' || user.role === 'CAPTAIN') {
      return this.isCaptainOrManager = true;
    } else {
      return this.isCaptainOrManager = false;
    }
  } else {
    Swal.fire('Utente non loggato');
    return false;
  }
}



 showPlayers(team: Team){}

}
