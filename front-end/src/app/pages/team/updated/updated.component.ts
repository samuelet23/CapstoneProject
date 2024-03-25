import { Player } from './../../../api/models/player';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto, Team, TeamDto, UpdateCaptainDto, UpdateTeamNameDto } from '../../../api/models';
import Swal from 'sweetalert2';
import { Location, formatDate } from '@angular/common';
import { TeamService } from '../../../services/team.service';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-updated',
  templateUrl: './updated.component.html',
  styleUrl: './updated.component.scss'
})
export class UpdatedComponent implements OnInit{
  private router = inject (Router);
  private route = inject (ActivatedRoute);
  private teamSv = inject (TeamService);
  private location = inject(Location)
  private playerSv = inject (PlayerService);
  isLoading: boolean = false;
urlImg:string ='';
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
  isUpdating: boolean = false;
  teamName: string | null = this.route.snapshot.paramMap.get('name');

  newCaptain: UpdateCaptainDto ={
    nickname: ''
  }
  newName: UpdateTeamNameDto ={
    teamName: ''
  }
  constructor(
  ) {}

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
            this.location.back()
          });
          this.isLoading = false;
        }
      );
    }
  }


  updateName(){
    this.isLoading = true
    if (this.teamToUpdate.id && this.newName.teamName.length > 2) {
      this.teamSv.updateName(this.teamToUpdate.id, this.newName).subscribe(() =>{
        Swal.fire("Nome del team aggiornato correttamente")
        this.location.back()
        this.isLoading = false
      },
      (error)=>{
        Swal.fire("Errore nella modifica, prova con un altro nome")
        this.isLoading = false
      })
    } else{
      Swal.fire("Il nome deve essere superiore di 2 caratteri")
      this.isLoading = false

    }
  }

  updateCaptain(): void {

    this.isLoading = true;
    this.teamSv.updateCaptainName(this.teamToUpdate.name, this.newCaptain ).subscribe((data) =>{
        Swal.fire("Nome del capitano aggiornato correttamente")
        this.isLoading = false;
      },
      (error) => {
        Swal.fire(error.error.message)
        this.isLoading = false;
      });

  }



  isCaptainNameValid(): boolean | undefined {
    const captainName = this.teamToUpdate.captain?.name?.toLowerCase();
    const players = this.teamToUpdate.players;
    return players?.some(player => player.nickname?.toLowerCase() === captainName);
  }


  onFileSelected(event: any, teamName: string | null) {

    const file: File = event.target.files[0];

    this.isLoading = true;
    if (teamName) {
      this.teamSv.uploadLogoTeam(teamName, file).subscribe(
        response => {
          this.urlImg = response.url;
          Swal.fire("Il logo è stato modificato con successo");
          this.location.back()
          this.isLoading = false;
        },
        (error) => {
          console.error("Errore durante il caricamento dell'immagine:", error);
          Swal.fire("Errore nel caricamento dell'immagine. Prova con un immagine con dimensioni inferiori");
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }



}

