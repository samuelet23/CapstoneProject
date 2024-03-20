import { RefereeDto } from './../../api/models/referee-dto';
import { Component, OnInit, inject } from '@angular/core';
import { RefereesService } from '../../services/referees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrl: './referees.component.scss'
})
export class RefereesComponent implements OnInit  {
  private refereeSv = inject(RefereesService)
  private tournamentSv = inject(TournamentService)
  isLoading: boolean = false
  refereeForm: FormGroup;
  remainingReferees: number | null = null;
  private route = inject(ActivatedRoute);
  nameTournament:string | null = this.route.snapshot.paramMap.get('name')

  constructor(private fb: FormBuilder) {
    this.refereeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateRemainingReferees()
  }



  isNotValidAndTouched(controlName: string): boolean | null  {
    const control = this.refereeForm.get(controlName);
    return control && control.invalid && control.touched;
  }

    onSubmit(): void {
      this.isLoading = true;
      const refereeDto: RefereeDto = {
        dateOfBirth: this.checkDateAndFormat(this.refereeForm.get('dateOfBirth')?.value),
        name: this.refereeForm.get('name')?.value,
        nickname: this.refereeForm.get('nickname')?.value,
        surname: this.refereeForm.get('surname')?.value,
      };

      if (this.refereeForm.valid && this.nameTournament) {
        this.refereeSv.createReferee(this.nameTournament.trim().toLowerCase(),refereeDto).subscribe((referee) => {
            console.log(referee);
            this.isLoading = false;
            Swal.fire("Referee creato correttamente");
            this.refereeForm.reset();
            this.updateRemainingReferees();
          },
          (error) => {
            this.isLoading = false;
            Swal.fire(error);
          }
        );
      } else {
        this.isLoading = false;
      }
    }

    updateRemainingReferees(): void {
      if (this.nameTournament && this.remainingReferees) {
        this.tournamentSv.getTournamentByName(this.nameTournament).subscribe(data => {
          if (data.level === "JUNIOR") {
            this.remainingReferees = 1;
          } else if (data.level === "RISINGSTARS") {
            this.remainingReferees = 2;
          } else if (data.level === "ELITE") {
            this.remainingReferees = 3;
          }

          this.remainingReferees!--;
          console.log("Remaining Referees:");
        });
      }
    }



  private checkDateAndFormat(dateOfBirth: string): string {
    this.isLoading = false
    const dateOfBirthDate: Date = new Date(dateOfBirth);
    const today: Date = new Date();
    if (isNaN(dateOfBirthDate.getTime()) || dateOfBirthDate > today) {
      Swal.fire({
        title: 'Errore',
        text: 'La data di nascita non è valida o è successiva a oggi.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.isLoading = false
      throw new Error('La data di nascita non è valida o è successiva a oggi.');
    }

    return formatDate(
      dateOfBirthDate,
      'dd-MM-yyyy',
      'en-US'
    );
  }
}
