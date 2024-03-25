import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePasswordDto } from '../../../api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  private userSv = inject(UserService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  username: string | null = this.route.snapshot.paramMap.get('username');
  isLoading:boolean = false
  updatePasswordDto: UpdatePasswordDto ={
    newConfirmPassword: '',
    newPassword: '',
    oldPassword: ''
  }

  constructor(){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(7)]],
      newPassword: ['', [Validators.required, Validators.minLength(7)]],
      newConfirmPassword: ['', [Validators.required, Validators.minLength(7)]]
    }, { validator: this.passwordMatchValidator });
  }


  get formControls() {
    return this.passwordForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const newConfirmPassword = formGroup.get('newConfirmPassword')?.value;

    if (newPassword !== newConfirmPassword) {
      formGroup.get('newConfirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('newConfirmPassword')?.setErrors(null);
    }
  }
  onSubmit(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    this.updatePasswordDto ={
      newConfirmPassword: this.formControls['oldPassword'].value,
      newPassword: this.formControls['newPassword'].value,
      oldPassword: this.formControls['newConfirmPassword'].value
    }
    this.isLoading = true;

    if (this.username) {

      this.userSv.updatePassword(this.username,this.updatePasswordDto).subscribe(
        () => {
          Swal.fire('Password aggiornata con successo')
          this.isLoading = false;
          this.router.navigate([`/user/modifica/${this.username}`])
        },
        (error) => {
          Swal.fire(`Errore durante l'aggiornamento della password`);
          this.isLoading = false;
        }
        );
      }
  }


  goBack(){
    this.location.back()
  }
}
