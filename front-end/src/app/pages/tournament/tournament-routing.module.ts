import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { AllTournamentsComponent } from './all-tournaments/all-tournaments.component';
import { CreateComponent } from './create/create.component';
import { RefereesComponent } from '../../components/referees/referees.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ProvinceTournamentComponent } from './province-tournament/province-tournament.component';
import { RoundsComponent } from '../../components/rounds/rounds.component';

const routes: Routes = [
  {
   path: 'create',
   component: CreateComponent,
   canActivate:[RoleGuard],
  },
  {
   path: ':name/rounds',
   component: RoundsComponent,
   canActivate:[AuthGuard],
  },
  {
   path: ':name/teams',
   component: TournamentComponent,
   canActivate:[AuthGuard],
  },
  {
   path: ':name/referee',
   component: RefereesComponent,
   canActivate:[RoleGuard],
  },
   {
    path: ':name/classifica',
    component: ClassificaComponent,
    canActivate:[AuthGuard],
   },
   {
     path:'get/all',
     component: AllTournamentsComponent,
     canActivate:[AuthGuard],
   },
   {
     path:'province/:name',
     component: ProvinceTournamentComponent,
     canActivate:[AuthGuard],
   }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
