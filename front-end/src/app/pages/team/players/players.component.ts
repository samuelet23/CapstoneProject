import { Component, inject } from '@angular/core';
import { Player, PlayerDto, Team, TeamDto } from '../../../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { PlayerService } from '../../../services/player.service';
import Swal from 'sweetalert2';
import { Location, formatDate } from '@angular/common';
import { myAuthService } from '../../../services/myAuth.service';

@Component({
  selector: 'app-player',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  private auth = inject (myAuthService);
  private location = inject(Location)
  private route = inject (ActivatedRoute);
  private teamSv = inject (TeamService);
  private playerSv = inject (PlayerService);
  isLoading: boolean = false;
  isUpdating: boolean = false;
  isCoordinator: boolean = false;
  isManager: boolean = false;


  players: Player[] = [];
  teamToUpdate: Team  ={
    name: '',
    players: [],
    captain: {
      dateOfBirth: '',
      name: '',
      nickname: '',
      sigla: '',
      surname: '',
      teamName: '',
      id: ''
    }
  }

  teamName: string | null = this.route.snapshot.paramMap.get('name');


  ngOnInit(): void {
    this.auth.getUserRole$().subscribe(role =>{
      if (role === "MANAGER") {
        return this.isManager = true;
      }
      if (role === "COORDINATOR") {
        this.isCoordinator = true;
      }
      return false
    })
    this.getTeamFromName();
    this.checkIfPlayerExists()

  }

  getTeamFromName(): void {
    this.isLoading = true;
    if (this.teamName) {
      this.teamSv.getTeamFromName(this.teamName.trim().toLocaleLowerCase()).subscribe(
        team => {
          this.teamToUpdate = team;
          this.isLoading = false;
        },
        error => {
          Swal.fire('Errore', error.error.message, 'error').then(() => {
            this.location.back()
          });
          this.isLoading = false;
        }
      );
    }
  }

  checkIfPlayerExists(): void {
    this.isLoading = true;

    if (this.teamName) {
      this.teamSv.getAllPlayersFromTeam(this.teamName).subscribe((teamPlayers) => {
        this.players = teamPlayers;
        this.isLoading = false;
      });
    }
  }
  isPlayerInDatabase(player: Player): boolean {
    return this.players.findIndex(p => p.id === player.id) !== -1;
  }
  hasNickname(player: Player): boolean {
    return player.nickname !== null && player.nickname !== undefined && player.nickname.trim() !== '';
  }
  isNicknameInTeam(player: Player, playersOfTeam: Player[]): boolean {
    return playersOfTeam.some(p => p.nickname === player.nickname);
  }
  hasNicknameAndIsInDatabase(player: Player): boolean {
    return this.hasNickname(player) && this.isPlayerInDatabase(player);
  }

  goBack(){
    this.location.back();
  }

  updatePlayer(player: PlayerDto , id: string){

    const formattedDateOfBirth = this.checkDateAndFormat(player.dateOfBirth);

    player.dateOfBirth = formattedDateOfBirth;

    console.log(player);


    this.isLoading = true
    this.playerSv.updateCredentialPlayer(player, id).subscribe(result => {

      const index = this.teamToUpdate.players.findIndex(p => p.id === id);
      if (index !== -1) {
        this.teamToUpdate.players[index] = result;
      }
      Swal.fire("Il giocatore è stato aggiornato correttamente")
      this.isLoading = false;
    },
    (error) =>{
      Swal.fire("Errore nella modifica del giocatore, perfavore riprova")
      this.isLoading = false;
    })
  }

  addPlayer(){
    const newPlayer: Player = {
      name: '',
      surname: '',
      nickname: '',
      dateOfBirth: '',
      sigla: '',
      id: '',
      teamName: ''
    };
    this.teamToUpdate.players.push(newPlayer);

  }

  createPlayer(player:Player){
    const formattedDateOfBirth = this.checkDateAndFormat(player.dateOfBirth);

    player.dateOfBirth = formattedDateOfBirth;

    this.playerSv.createPlayer(player).subscribe(player =>{
      this.players.push(player)


    },
    (error) => {
        Swal.fire(error.error.message)
    })
  }


  saveTeam(players: Player[]): void {
    players.forEach((player) => {
      const formattedDateOfBirth = this.checkDateAndFormat(player.dateOfBirth);
      player.dateOfBirth = formattedDateOfBirth;
    });

    const teamDto: TeamDto = {
      nameTeam: this.teamToUpdate.name,
      captainName: this.teamToUpdate.captain?.name,
      players: this.teamToUpdate.players
    };

    let playersOfTeam: Player[] = [];

    this.teamSv.getAllPlayersFromTeam(teamDto.nameTeam).subscribe(players => {
      playersOfTeam = players;

      teamDto.players.forEach((playerDto) => {
        if (this.teamName) {

          const player: Player = {
            id: '',
            name: playerDto.name,
            surname: playerDto.surname,
          nickname: playerDto.nickname,
          dateOfBirth: playerDto.dateOfBirth,
          sigla: playerDto.sigla,
          teamName: this.teamName
        };


        if (!this.isNicknameInTeam(player, playersOfTeam)) {
          this.createPlayer(player);
          playersOfTeam.push(player);
        }
      }
      });

      this.teamSv.updateTeam(this.teamToUpdate.name, teamDto).subscribe(
        (team) => {
          Swal.fire("Il team è stato salvato correttamente");

        },
        (error) => {
          Swal.fire(error.error.message);
        }
      );
    });
  }


  deletePlayer(nickname:string){
    this.isLoading = true
    if (nickname  && this.teamToUpdate.players.length>3) {
    this.playerSv.removePlayerFromTeam(nickname).subscribe((player) =>{
      this.isLoading = false
      this.teamToUpdate.players = this.teamToUpdate.players.filter(p => p.nickname !== nickname);
      Swal.fire("Il giocatore"+nickname+" è stato eliminato correttamente dalla squadra")
    },
    (error) =>{
      Swal.fire("Errore nell'eliminazione del giocatore, perfavore riprova")
      this.isLoading = false;
    })
  }else{
    this.teamToUpdate.players = this.teamToUpdate.players.filter(p => p.nickname !== nickname);
    this.isLoading = false
  }

  }
  checkDateAndFormat(dateOfBirth: string): string {
    const dateOfBirthDate: Date = new Date(dateOfBirth);
    const today: Date = new Date();
    if (isNaN(dateOfBirthDate.getTime()) || dateOfBirthDate > today) {
      Swal.fire('Errore', 'La data di nascita non è valida o è successiva a oggi.', 'error');
      throw new Error('La data di nascita non è valida o è successiva a oggi.');
    }
    return formatDate(dateOfBirthDate, 'dd-MM-yyyy', 'en-US');
  }




  passaModifica(){
    this.isUpdating = !this.isUpdating;
  }


}
