import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ResetPasswordService } from './../../services/reset-password.service';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private passowrdSv = inject(ResetPasswordService);
  private userSv = inject(UserService);
  private location = inject(Location);
  private router= inject(Router);

  isLoading: boolean = false;
  email: string = '';

  recoverPassword() {
    this.isLoading = true;
    this.userSv.getUserByEmail(this.email).subscribe(
      (user) => {
        this.passowrdSv.forgotPassword(this.email).subscribe((res) =>{
          Swal.fire("Info", res.message,"info").then(()=>{
            this.router.navigate(['/auth/login'])
          })
          this.isLoading = false;
        },
        (error) =>{
          this.isLoading = false
          Swal.fire(error.error.message)
        })
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('Errore', error.error.message, 'error');
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  }

  goBack(){
    this.location.back()
  }

}
