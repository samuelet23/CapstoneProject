import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, inject } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { ActivatedRoute, NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player, PlayerDto, Team, TeamDto } from '../../../api/models';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrl: './created.component.scss'
})
export class CreatedComponent implements OnInit {
isLoading:boolean = false;
players!:FormArray
teamForm!: FormGroup;
isUpdating:boolean = false;
private route = inject(ActivatedRoute);
private fb = inject(FormBuilder);
private teamSv = inject(TeamService)
private router = inject(Router)
teamName = this.route.snapshot.paramMap.get('name')
teamToUpdate:Team ={
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

constructor() {
}




  ngOnInit(): void {
    this.teamForm = this.fb.group({
      nameTeam: ['', Validators.required],
      captainName: ['', Validators.required],
      players: this.fb.array([], Validators.required)
    });
      this.addPlayer();
    }


  submitForm() {
    if (this.teamForm.valid) {
      const team: TeamDto = {
        captainName: this.teamForm.value.captainName,
        nameTeam: this.teamForm.value.nameTeam,
        players: this.teamForm.value.players.map((player: PlayerDto) => {
          const playerDto: PlayerDto = {
            dateOfBirth: this.checkDateAndFormat(player.dateOfBirth),
            name: player.name,
            nickname: player.nickname,
            sigla: player.sigla,
            surname: player.surname
          };
          return playerDto;
        })
      };
      const nameTournament = this.route.snapshot.paramMap.get('name');
      if (nameTournament) {
        this.subscribeCreatedTeam(team, nameTournament)
      } else{
        throw new Error ('Il nome del torneo è inesistente')
      }
    }
  }




  subscribeCreatedTeam(team:TeamDto, tournamentName:string){
    this.teamSv.subscribeCreatedTeamToTournament(team, tournamentName).subscribe(team =>{
        Swal.fire("Il team è stato creato con successo nel torneo", tournamentName).then(() =>{
          this.router.navigate(['/tournament'])
        });

    },
    (error) => {
      Swal.fire (error.error.message);
    })
  }




  isValid(fieldName:string){
    return this.teamForm.get(fieldName)?.valid
  }

  isTouched(fieldName:string){
    return this.teamForm.get(fieldName)?.touched
  }

  getPlayerControl(index: number, fieldName: string) {
    return (this.teamForm.get('players') as FormArray).at(index).get(fieldName);
  }
  getUpdateControl(fieldName: string) {
    const playersArray = this.teamForm.get('players') as FormArray;
    for (let i = 0; i < playersArray.length; i++) {
      const playerFormGroup = playersArray.at(i) as FormGroup;
      if (playerFormGroup.controls[fieldName]) {
        return playerFormGroup.controls[fieldName];
      }
    }
    return null;
  }

isCaptainNameValid(): boolean {
  const captainName = this.teamForm.value.captainName;
  const players = this.teamForm.value.players;

  return players.some((player: { nickname: any; }) => player.nickname === captainName);
}



addPlayer() {
 this.players = this.teamForm.get('players') as FormArray;
  if (this.players.length < 5) {
    this.players.push(this.createPlayer());
    this.createPlayer()
  }
  else{
    Swal.fire("Non puoi creare più di 5 giocatori per ogni team")
  }
}


removePlayer(index: number) {
  this.players = this.teamForm.get('players') as FormArray;
  if (this.players.length >1) {
    this.players.removeAt(index);
  } else{
    Swal.fire('Erorre: inserisci minimo 3 giocatori')
  }
  }

  removePlayerById(id:string){

  }

createPlayer(): FormGroup {
  return this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    nickname: ['', [Validators.required, Validators.minLength(3)]],
    dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
    sigla: ['', [Validators.required, Validators.pattern(/[A-E]/)]]
  });
}



private checkDateAndFormat(dateOfBirth: string): string {
  const dateOfBirthDate: Date = new Date(dateOfBirth);
  const today: Date = new Date();
  if (isNaN(dateOfBirthDate.getTime()) || dateOfBirthDate > today) {
    Swal.fire({
      title: 'Errore',
      text: 'La data di nascita non è valida o è successiva a oggi.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    throw new Error('La data di nascita non è valida o è successiva a oggi.');
  }

  return formatDate(
    dateOfBirthDate,
    'dd/MM/yyyy',
    'en-US'
  );
}
private dateOfBirthValidator(control: FormControl) {
  const inputDate = new Date(control.value);
  const currentDate = new Date();
  return inputDate <= currentDate ? null : { invalidDateOfBirth: true };
}
protected arePlayersValid() {
  if (this.players.length < 3 || this.players.length > 5) {
    return false;
  }

  for (let i = 0; i < this.players.length; i++) {
    const playerFormGroup = this.players.at(i) as FormGroup;
    if (playerFormGroup.invalid) {
      return false;
    }
  }

  return true;
}

}
