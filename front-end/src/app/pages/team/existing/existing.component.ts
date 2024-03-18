import { Component, OnInit, inject } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { TournamentService } from '../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team, TeamDto } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-existing',
  templateUrl: './existing.component.html',
  styleUrl: './existing.component.scss'
})
export class ExistingComponent implements OnInit {
  isLoading:boolean = false;
  private teamSv = inject(TeamService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  teams: Team[] =[]
  nameTournament:string|null = this.route.snapshot.paramMap.get('name');
  constructor(){}

ngOnInit(): void {
  this.isLoading = true
  if (this.nameTournament) {
    this.teamSv.getAllTeamWithoutTournament()
      .subscribe((teams: any) => {
        console.log(teams);

        this.isLoading = false;
        this.teams = teams;
      })
  } else{
    this.isLoading = false;
    throw new Error ("Il nome non esiste nel torneo")
  }
}


addExistingTeam(teamName:string){
  if (this.nameTournament) {
    this.teamSv.subscribeExsistingTeamToTournament(teamName, this.nameTournament).subscribe(team =>{
      Swal.fire(`Il team ${team.name}è stato aggiunto correttamente al torneo ${this.nameTournament}`).then(()=>{
        const index = this.teams.findIndex(team => team.name === teamName);
        if (index !== -1) {
          this.teams.splice(index, 1);
        }
        this.router.navigate(['/tournament'])
      })
    })
  }
}

}
