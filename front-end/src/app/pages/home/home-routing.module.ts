import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { FavoritesComponent } from '../../components/favorites/favorites.component';

const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: ':username/favorite-tournaments', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
