declare var google:any
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private fb = inject(FormBuilder)
  private auth = inject(myAuthService)
  private router = inject(Router)
  isLoading:boolean =false;
  form!:FormGroup;
  userRole$ = new BehaviorSubject<string>('');


  constructor(){}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '558661000376-fkg5c4718pmq6djm3dt7qqtucml2ju0i.apps.googleusercontent.com',
      callback: (resp:any) =>{
        this.handleLogin(resp)
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:'medium',
      shape:'rectangle',
      width: 250
    })


    this.form = this.fb.group({
      username:['', [Validators.required, Validators.minLength(5)]],
      password:['', [Validators.required, Validators.minLength(7)]]
    })
  }
decodeToken(token:string){
  return JSON.parse(atob(token.split('.')[1]));
}

  handleLogin(res:any){
      if (res) {
        const payload = this.decodeToken(res.credential);
        sessionStorage.setItem("googleUser",JSON.stringify(payload));
        this.router.navigate(['/'])
      }
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
              this.router.navigate(['/'+this.form.value.username])
              this.isLoading = false;
            })
            this.isLoading = false;
          }else{
            Swal.fire('Errore interno, ripova')
            this.isLoading = false
          }
        },
        (error) => {
          if (error.error.message === "passowrd o username errati") {
            Swal.fire("Errore", "Nome utente o password errati", "error");
          } else {
            Swal.fire("Errore", error.error.message, "error");
          }
          this.isLoading = false;
        })

  }
  }

}
