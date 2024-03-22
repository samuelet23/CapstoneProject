import { AccessTokenRes } from './../../api/models/access-token-res';
import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Game, Team } from '../../api/models';
import Swal from 'sweetalert2';
import { TeamService } from '../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent implements OnInit {
  private tournamentSv = inject(TournamentService);
  private teamSv = inject(TeamService);
  private gameSv = inject(GameService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  tournamentName: string | null = this.route.snapshot.paramMap.get('name');
  isLoading: boolean = false;
  isFinalFinished: boolean = false;
  teams: Team[] = [];
  games: Game[] = [];
  isCaptainOrManager: boolean = false;
  dropdownOpen: boolean = false;

  constructor() {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit(): void {
    this.isCaptainOrManagaer();
    this.isLoading = true;
    if (this.tournamentName) {
      this.tournamentSv.getAllTeamFromTournament(this.tournamentName).subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.isLoading = false;
          if (teams.length === 16) {
            this.getAllGameFromTournament();

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

  private isCaptainOrManagaer(): boolean {
    const userString = localStorage.getItem('utente');
    if (userString !== null) {
      const user = JSON.parse(userString);
      if (user.role === 'MANAGER' || user.role === 'CAPTAIN') {
        return (this.isCaptainOrManager = true);
      } else {
        return (this.isCaptainOrManager = false);
      }
    } else {
      Swal.fire('Utente non loggato');
      return false;
    }
  }

  getAllGameFromTournament() {
    this.isLoading = true;
    if (this.tournamentName) {
      this.gameSv.getAllGameFromtournament(this.tournamentName).subscribe(
        (games) => {
          this.games = games;
          if (games.length == 1) {
            games.forEach((game) => {
              if (game.status == 'FINISHED') {
                this.isFinalFinished = true;
              }
            });
          }
          this.isLoading = false;
        },
        (error) => {
          Swal.fire(error.error.message);
          this.isLoading = false;
        }
      );
    }
    this.isLoading = false;
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
  isFinishedGame(game: Game): boolean {
    if (
      (game.round === 'OCTAVEFINAL' ||
        game.round === 'QUARTERFINAL' ||
        game.round === 'SEMIFINAL' ||
        game.round === 'FINAL') &&
      game.status === 'FINISHED'
    ) {
      return true;
    } else {
      return false;
    }
  }

  areFinishedAllGames(games: Game[]): boolean {
    return games.every((game) => game.status === 'FINISHED');
  }

  getTournamentPhase(matches: number): string {
    switch (matches) {
      case 8:
        return 'OTTAVI DI FINALE';
      case 4:
        return 'QUARTI DI FINALE';
      case 2:
        return 'SEMIFINALE';
      case 1:
        return 'FINALE';
      default:
        return '';
    }
  }
  getRoundPhase(matches: number): string {
    switch (matches) {
      case 8:
        return 'Vai ai quarti';
      case 4:
        return 'Vai in semifinale';
      case 2:
        return 'Vai in Finale';
      default:
        this.isFinalFinished = true;
        return "Il torneo si è concluso. Grazie a tutti! Scopri chi ha vinto l'MVP";
    }
  }

  getRouterLink(matches: number) {
    switch (matches) {
      case 8:
        return this.generaQuarti();
      case 4:
        return this.generaSemiFinale();
      case 2:
        return this.generaFinale();
      default:
        return `/tournament/${this.tournamentName}/classifica`;
    }
  }

  generaOttavi() {
    this.isLoading = true;
    if (this.tournamentName) {
      this.tournamentSv.generateOttavi(this.tournamentName).subscribe(
        (res: Game[]) => {
          this.games = res;
          this.isLoading = false;
        },
        (err: any) => {
          Swal.fire(err.error.message);
          this.isLoading = false;
          this.router.navigate(['/tournament/' + this.tournamentName]);
        }
      );
    }
  }

  generaQuarti() {
    if (this.tournamentName) {
      this.isLoading = true;
      this.tournamentSv.generateQuarti(this.tournamentName).subscribe(
        (res: Game[]) => {
          this.games = res;
          console.log(this.games, 'generati quarti');
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(error.error.message);
          this.router.navigate(['/tournament/' + this.tournamentName]);
        }
      );
    }
    this.isLoading = false;
  }

  generaSemiFinale() {
    if (this.tournamentName) {
      this.tournamentSv.generateSemiFinale(this.tournamentName).subscribe(
        (data) => {
          this.games = data;
          this.isLoading = false;
        },
        (err) => {
          Swal.fire(
            "Errore interno, potrebbero essersi generati comunque, altrimenti contattare l'assistenza"
          );
          this.isLoading = false;
          this.router.navigate(['/tournament/' + this.tournamentName]);
        }
      );
    }
  }

  generaFinale() {
    if (this.tournamentName) {
      this.isLoading = true;
      this.tournamentSv.generateFinale(this.tournamentName).subscribe(
        (games) => {
          this.isLoading = false;
          this.games = games;
        },
        (error) => {
          Swal.fire(error.error.message);
          this.isLoading = false;
          this.router.navigate(['/tournament/' + this.tournamentName]);
        }
      );
    }
    this.isLoading = false;
  }
}
