import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerDto, TeamDto } from '../../../api/models';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrl: './created.component.scss'
})
export class CreatedComponent implements OnInit {
players!:FormArray
teamForm!: FormGroup;

constructor(private fb: FormBuilder) {}
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

      console.log(team);
    } else {
      console.log('Il form non è valido');
    }
  }

isInvalid(field: string): boolean {
  const formControl = this.teamForm.get(field)?.value;
  return formControl.invalid && (formControl.dirty || formControl.touched);
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


createPlayer(): FormGroup {
  return this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    nickname: ['', [Validators.required, Validators.minLength(3)]],
    dateOfBirth: ['', [Validators.required,]],
    sigla: ['', [Validators.required, Validators.pattern(/[A-E]/)]]
  });
}


private checkDateAndFormat(dateOfBirth: string): string {
  console.log('Data di nascita fornita:', dateOfBirth);
  const dateOfBirthDate: Date = new Date(dateOfBirth);
  console.log('Data di nascita convertita:', dateOfBirthDate);
  const today: Date = new Date();
  console.log('Data corrente:', today);
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
    'dd-MM-yyyy',
    'en-US'
  );
}

}
