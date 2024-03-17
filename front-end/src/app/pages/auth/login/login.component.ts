import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Login$Params } from '../../../api/fn/auth/login';
import { AccessTokenRes, LoginDto, User } from '../../../api/models';
import { AuthService } from '../../../api/services';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { myAuthService } from '../../../services/myAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  isLoading:boolean =false;
  form!:FormGroup;


  constructor(private fb: FormBuilder, private  auth: myAuthService, private router: Router){}

  ngOnInit(): void {
    this.form = this.fb.group({
      username:['', [Validators.required, Validators.minLength(5)]],
      password:['', [Validators.required, Validators.minLength(7)]]
    })
  }


  access(): void {
    this.isLoading = true;
    if (this.form && this.form.valid) {
      const loginParams: LoginDto = {
          password: this.form.value.password,
          username: this.form.value.username,
        }

        this.auth.login(loginParams).subscribe((res:AccessTokenRes)=>{
          const token = res.accessToken;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/']);

          }else{
            Swal.fire('Errore interno, ripova')
            this.isLoading = false
          }
        },
        (error) => {

          Swal.fire(error.error.message)
          this.isLoading = false;
        })

  }
  }

}
