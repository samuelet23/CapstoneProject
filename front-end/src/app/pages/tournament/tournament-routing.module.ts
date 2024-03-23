import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { AllTournamentsComponent } from './all-tournaments/all-tournaments.component';
import { CreateComponent } from './create/create.component';
import { RefereesComponent } from '../../components/referees/referees.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
   path: 'create',
   component: CreateComponent,
   canActivate:[AuthGuard],
  },
  {
   path: ':name',
   component: TournamentComponent,
  },
  {
   path: ':name/referee',
   component: RefereesComponent,
   canActivate:[AuthGuard],
  },
   {
    path: ':name/classifica',
    component: ClassificaComponent
   },
  {
    path:'get/all',
    component: AllTournamentsComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
