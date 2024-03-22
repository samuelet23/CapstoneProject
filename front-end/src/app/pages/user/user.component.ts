import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserUpdateDto } from '../../api/models';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private fb = inject(FormBuilder);
  private userSv = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  username: string | null = this.route.snapshot.paramMap.get('username');
  isLoading:boolean = false
  userForm!: FormGroup;
  user:User = {
    age: 0,
    dateOfBirth: '',
    email: '',
    name: '',
    surname: '',
    username: ''
  }

  ngOnInit(): void {
    if (this.username) {
      this.getUserByUsername(this.username);
    }
  }

  getUserByUsername(username: string) {
    this.isLoading = true;
    this.userSv.getUserByUsername(username).subscribe(user => {
      this.user = user;
      this.initForm();
      this.isLoading = false;
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      username: [this.user.username, [Validators.required, Validators.minLength(5)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      surname: [this.user.surname, [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [this.user.dateOfBirth, [Validators.required]]
    });
  }

  get formControls() {
    return this.userForm.controls;
  }


onSubmit(){
  this.isLoading = true;
  const user: UserUpdateDto = {
    name: this.formControls['name'].value,
    surname: this.formControls['surname'].value,
    username: this.formControls['username'].value,
    email: this.formControls['email'].value,
    dateOfBirth: this.checkDateAndFormat(this.formControls['dateOfBirth'].value)
  };


  if (this.username) {
    this.userSv.updateCredentialUser(this.username, user).subscribe(res =>{
      Swal.fire("Utente modificato correttamente")
      this.isLoading = false;
      this.router.navigate(['/'])
    },
    (error)=>{
      Swal.fire(error.error.message)
      this.isLoading = false
    })
  }
this.isLoading = false;
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

}
