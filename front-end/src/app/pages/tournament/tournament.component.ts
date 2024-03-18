import { AccessTokenRes } from './../../api/models/access-token-res';
import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Team } from '../../api/models';
import Swal from 'sweetalert2';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss'
})
export class TournamentComponent implements OnInit{

  private tournamentSv = inject(TournamentService)
  private teamSv = inject(TeamService)

  isLoading:boolean = false;
  teams:Team[] = []
  isCaptainOrManager:boolean = false;
  tournamentName:string = "string"
  dropdownOpen: boolean = false;

 constructor(){
}

toggleDropdown(){
  this.dropdownOpen = !this.dropdownOpen
}

ngOnInit(): void {
   this.isCaptainOrManagaer()
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

updateTeam(arg0: string) {
  }

 showPlayers(team: Team){}


 removeTeam(teamName: string){
  this.teamSv.deleteTeamFromTournament(teamName, this.tournamentName)
    .subscribe(() =>{
      const index = this.teams.findIndex(team => team.name === teamName);
      if (index !== -1) {
        this.teams.splice(index, 1);
      }
      Swal.fire("Team"+teamName+"eliminato correttamente dal torneo");
  })
 }
}
