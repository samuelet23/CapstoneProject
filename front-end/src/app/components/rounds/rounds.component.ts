import { Component, inject } from '@angular/core';
import { Game } from '../../api/models';
import { TournamentService } from '../../services/tournament.service';
import { TeamService } from '../../services/team.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { myAuthService } from '../../services/myAuth.service';
import { GameService } from '../../services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrl: './rounds.component.scss',
})
export class RoundsComponent {
  private tournamentSv = inject(TournamentService);
  private gameSv = inject(GameService);
  private authSv = inject(myAuthService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  tournamentName: string | null = this.route.snapshot.paramMap.get('name');
  isLoading: boolean = false;
  isFinalFinished: boolean = false;
  isManagerOrCoordinator: boolean = false;
  isUser: boolean = false;
  games: Game[] = [];

  ngOnInit() {
    this.authSv.getUserRole$().subscribe((role) => {
      if (role == 'MANAGER' || role == 'COORDINATOR') {
        {
          this.isManagerOrCoordinator = true;
        }
        this.isUser = true;
      }
    });

    this.getAllGameFromTournament();
  }

  getAllGameFromTournament() {
    this.isLoading = true;
    if (this.tournamentName) {
      this.gameSv.getAllGameFromtournament(this.tournamentName).subscribe(
        (games) => {
          this.games = games;
          if (!games.length) {
            this.generaOttavi();
          }
          else if (games.length == 1) {
            games.forEach((game) => {
              if (game.status == 'FINISHED') {
                if (this.tournamentName) {
                  this.tournamentSv
                  .finishTournament(this.tournamentName)
                  .subscribe((t) => {
                    console.log(t);
                  });
                }
                this.isFinalFinished = true;
                return;
              }
            });
          }

          this.isFinalFinished = false;
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
          console.log(this.games);

          this.isLoading = false;
        },
        (err: any) => {
          Swal.fire(err.error.message);
          this.isLoading = false;
          this.location.back();
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
          this.location.back();
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
          this.location.back();
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
  generaFinale() {
    if (this.tournamentName) {
      this.isLoading = true;
      this.tournamentSv.generateFinale(this.tournamentName).subscribe(
        (games) => {
          this.games = games;
          this.isLoading = false;
        },
        (error) => {
          Swal.fire(error.error.message);
          this.isLoading = false;
          this.location.back();
        }
      );
    }
    this.isLoading = false;
  }
}
