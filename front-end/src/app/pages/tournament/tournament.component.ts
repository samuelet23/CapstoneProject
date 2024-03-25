import { AccessTokenRes } from './../../api/models/access-token-res';
import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Game, Team } from '../../api/models';
import Swal from 'sweetalert2';
import { TeamService } from '../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { FilterService } from '../../services/filter.service';
import { Location } from '@angular/common';
import { myAuthService } from '../../services/myAuth.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent implements OnInit {
  private tournamentSv = inject(TournamentService);
  private teamSv = inject(TeamService);
  private location = inject(Location)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(myAuthService);

  tournamentName: string | null = this.route.snapshot.paramMap.get('name');
  isLoading: boolean = false;
  isFinalFinished: boolean = false;
  teams: Team[] = [];
  games: Game[] = [];
  isCaptainOrManager: boolean = false;
  dropdownOpen: boolean = false;
  isVisible:boolean = true;

  constructor() {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit(): void {
    this.auth.getUserRole$().subscribe(role =>{
      if (role === "MANAGER" || role === "COORDINATOR") {
        return this.isCaptainOrManager = true;
      }
      return false
    })
    this.isLoading = true;
    if (this.tournamentName) {
      this.tournamentSv.getAllTeamFromTournament(this.tournamentName).subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.isLoading = false;
          if (teams.length == 16) {
            this.router.navigate([`/tournament/${this.tournamentName}/rounds`])

            this.isLoading = false;
            return;
          }
        },
        (error) => {
          Swal.fire(error.error.message);
          this.isLoading = false;
        }
      );
    }
    this.isLoading = false;
  }


goBack(){
  this.location.back();
}


  removeTeam(teamName: string) {
    if (this.tournamentName) {
      this.teamSv
        .deleteTeamFromTournament(teamName, this.tournamentName)
        .subscribe(() => {
          const index = this.teams.findIndex((team) => team.name === teamName);
          if (index !== -1) {
            this.teams.splice(index, 1);
          }
          Swal.fire('Team' + teamName + 'eliminato correttamente dal torneo');
        });
    }
  }

}
