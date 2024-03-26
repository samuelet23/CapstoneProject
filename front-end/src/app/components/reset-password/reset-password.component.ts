import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ResetPassword } from '../../api/models/reset-password';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent{
  private passwordSv = inject(ResetPasswordService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private formBuilder= inject(FormBuilder)


  resetPasswordForm: FormGroup;
  isLoading:boolean = false
  email: string | null = this.route.snapshot.queryParamMap.get('email');

  constructor() {

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]]
    },{
      validator:this.checkPasswords
    });
  }

  resetPassword() {
    this.isLoading = true;
    const reset:ResetPassword ={
      newPassword: this.resetPasswordForm.get('password')?.value,
      confirmNewPassword: this.resetPasswordForm.get('confirmPassword')?.value
    }
    if (this.resetPasswordForm.valid && this.email) {
      this.isLoading= true;
      this.passwordSv.resetPassword(this.email,reset).subscribe(res =>{
        this.isLoading = false;
        Swal.fire("Success",res.message, "success").then(() =>{
          this.router.navigate(['/auth/login'])
        })
      },
      (error) =>{
        Swal.fire("Error",error.error.message, "error")
        this.isLoading = false;
      })
    } else {
      this.isLoading = false;
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password == confirmPassword ? null : { notSame: true };
  }

}
