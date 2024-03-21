import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { AllTournamentsComponent } from './all-tournaments/all-tournaments.component';
import { CreateComponent } from './create/create.component';
import { RefereesComponent } from '../../components/referees/referees.component';

const routes: Routes = [
  {
   path: 'create',
   component: CreateComponent,
  },
  {
   path: ':name',
   component: TournamentComponent,
  },
  {
   path: ':name/referee',
   component: RefereesComponent,
  },
   {
    path: ':name/classifica',
    component: ClassificaComponent
   },
  {
    path:'province/:provinceName',
    component: AllTournamentsComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
