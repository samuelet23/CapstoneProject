import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoggedHomeComponent } from './logged-home/logged-home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: ':username', component: LoggedHomeComponent,
   canActivate:[AuthGuard],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
