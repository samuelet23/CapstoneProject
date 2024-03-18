import { Player } from './../../../api/models/player';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto, Team, TeamDto, UpdateCaptainDto, UpdateTeamNameDto } from '../../../api/models';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
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
  private playerSv = inject (PlayerService);
  isLoading: boolean = false;

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
            this.router.navigate(['/tournament'])
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
          this.router.navigate(['/tournament'])
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
          this.router.navigate(['/tournament']);
          this.isLoading = false;
      },
      (error) => {
        Swal.fire("Errore nella modifica, prova con un altro nickname")
        this.isLoading = false;
      });

  }



  isCaptainNameValid(): boolean | undefined {
    const captainName = this.teamToUpdate.captain?.name?.toLowerCase();
    const players = this.teamToUpdate.players;
    return players?.some(player => player.nickname?.toLowerCase() === captainName);
  }




}

