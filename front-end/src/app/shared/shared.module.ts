import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from '../components/nav/nav.component';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../components/footer/footer.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { AllTournamentsComponent } from '../pages/tournament/all-tournaments/all-tournaments.component';
import { RefereesComponent } from '../components/referees/referees.component';
import { HomeSearchComponent } from '../components/home-search/home-search.component';
import { ClassificaComponent } from '../pages/tournament/classifica/classifica.component';
import { GoogleLoginComponent } from '../components/google-login/google-login.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';



@NgModule({
  declarations: [
    NavComponent,
    RegisterPageComponent,
    FooterComponent,
    SpinnerComponent,
    RefereesComponent,
    HomeSearchComponent,
    GoogleLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    NavComponent,
    RegisterPageComponent,
    FooterComponent,
    SpinnerComponent,
    RefereesComponent,
    HomeSearchComponent,
    GoogleLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FavoritesComponent,
  ]
})
export class SharedModule { }
