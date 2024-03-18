import { Component, inject } from '@angular/core';
import { Player, PlayerDto, Team, TeamDto } from '../../../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team.service';
import { PlayerService } from '../../../services/player.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  private router = inject (Router);
  private route = inject (ActivatedRoute);
  private teamSv = inject (TeamService);
  private playerSv = inject (PlayerService);
  isLoading: boolean = false;

  teamDto:TeamDto ={
    captainName: '',
    nameTeam: '',
    players: []
  }
  teamToUpdate: Team  ={
    name: '',
    players: [],
    captain: {
      dateOfBirth: '',
      name: '',
      nickname: '',
      sigla: '',
      surname: '',
      teamName: ''
    }
  }
  playerDto:PlayerDto ={
    dateOfBirth: '',
    name: '',
    nickname: '',
    sigla: '',
    surname: ''
  }
  teamName: string | null = this.route.snapshot.paramMap.get('name');


  ngOnInit(): void {
    this.getTeamFromName();
  }

  getTeamFromName(): void {
    this.isLoading = true;
    if (this.teamName) {
      this.teamSv.getTeamFromName(this.teamName).subscribe(
        team => {

          this.teamToUpdate = team;
          this.isLoading = false;
        },
        error => {
          Swal.fire('Errore', error.error.message, 'error').then(() => {
            this.router.navigate(['/tournament'])
          });
          this.isLoading = false;
        }
      );
    }
  }



  updatePlayer(player: PlayerDto , playerName: string){
    this.isLoading = true
    this.playerSv.updateCredentialPlayer(player, playerName).subscribe(result => {
      const index = this.teamToUpdate.players.findIndex(p => p.name === playerName);
      if (index !== -1) {
        this.teamToUpdate.players[index] = result;
      }
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

    this.playerDto ={
      dateOfBirth: this.checkDateAndFormat(newPlayer.dateOfBirth),
      name: newPlayer.name,
      nickname: newPlayer.nickname,
      sigla: newPlayer.sigla,
      surname: newPlayer.surname
    }

  }

  createPlayer(){
    this.playerSv.createPlayer(this.playerDto).subscribe(player =>{
      console.log(player);


    })
  }


  saveTeam(){
    this.teamDto ={
      nameTeam: this.teamToUpdate.name,
      captainName:  this.teamToUpdate.captain?.name,
      players:this.teamToUpdate.players
    }
    this.teamSv.updateTeam(this.teamToUpdate.name ,this.teamDto)
      .subscribe((team) => {
        console.log(team);
        Swal.fire("Il team è stato salvato correttament")

      },
      (error) =>{
        Swal.fire(error.error.message)
      })
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
    return formatDate(dateOfBirthDate, 'dd/MM/yyyy', 'en-US');
  }

}
