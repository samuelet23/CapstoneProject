declare var google:any
import { Component, OnInit, inject } from '@angular/core';
import { myAuthService } from '../../services/myAuth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent implements OnInit {
  private auth = inject(myAuthService)


  constructor(){}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '558661000376-fkg5c4718pmq6djm3dt7qqtucml2ju0i.apps.googleusercontent.com',
      callback: (resp:any) =>{
        this.auth.handleGoogleLogin(resp)
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:'medium',
      shape:'rectangle',
      width: 250
    })

  }
}
