import { User } from './../../api/models/user';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../api/services';
import { UserDto } from '../../api/models';
import { Register$Params } from '../../api/fn/auth/register';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { myAuthService } from '../../pages/auth/myAuth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  @Input() defaultRole!: string;
  isLoading: boolean = false;
  registrationForm!: FormGroup;
  hoveredDate: NgbDate | null = null;
  userRegister!: UserDto;

  constructor(
    private fb: FormBuilder,
    private auth: myAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        dateOfBirth: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: [this.defaultRole],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {


    const params: UserDto = {
        confirmPassword: this.registrationForm.value.confirmPassword,
        dateOfBirth: this.checkDateAndFormat(),
        email: this.registrationForm.value.email,
        name: this.registrationForm.value.name,
        password: this.registrationForm.value.password,
        role: this.registrationForm.value.role,
        surname: this.registrationForm.value.surname,
        username: this.registrationForm.value.username,
    };

    try {
      if (this.registrationForm && this.registrationForm.valid) {
        this.auth.signup(params).subscribe(
          (response: any) => {

            this.router.navigate(['auth/login']);
            this.isLoading = false;
          },
          (error) => {
            Swal.fire({
              title: 'Errore',
              text: error.error.message,
              icon: 'error',
              confirmButtonText: 'RIPROVA'
            });
            this.isLoading= false
          }
        );
      }
    } catch (error:any) {
     Swal.fire("Impossibile creare un account")
     this.isLoading= false

    }
}

private checkDateAndFormat():string{
  const dateOfBirth: Date = new Date(this.registrationForm.value.dateOfBirth);
  const today: Date = new Date();

  if (dateOfBirth > today) {
    Swal.fire({
      title: 'Errore',
      text: 'Ancora devi nascere?.',
      icon: 'error',
      confirmButtonText: 'RIPROVA'
    });
    throw new Error('La data di nascita non può essere successiva a oggi.')
  }

  const formattedDateOfBirth: string = formatDate(
    dateOfBirth,
    'dd-MM-yyyy',
    'en-US'
  );

  return formattedDateOfBirth
}


}
