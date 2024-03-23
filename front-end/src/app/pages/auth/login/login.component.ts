import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Login$Params } from '../../../api/fn/auth/login';
import { AccessTokenRes, LoginDto, User } from '../../../api/models';
import { AuthService } from '../../../api/services';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { myAuthService } from '../../../services/myAuth.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private fb = inject(FormBuilder)
  private auth = inject(myAuthService)
  private router = inject(Router)
  private roleSv = inject(RoleService)
  isLoading:boolean =false;
  form!:FormGroup;
  userRole$ = new BehaviorSubject<string>('');


  constructor(){}

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
            this.isLoading = false

            Swal.fire({
              title: 'Confermato',
              text: "Login avvenuto con successo",
              icon: 'success',
            }).then(() =>{
              this.router.navigate(['/'])
              this.isLoading = false;
            })
            this.isLoading = false;
          }else{
            Swal.fire('Errore interno, ripova')
            this.isLoading = false
          }
        },
        (error) => {

          Swal.fire("Errore nel carimento del server")
          this.isLoading = false;
        })

  }
  }

}
