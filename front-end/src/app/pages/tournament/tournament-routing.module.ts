import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { OttaviComponent } from './ottavi/ottavi.component';
import { QuartiComponent } from './quarti/quarti.component';
import { SemifinaleComponent } from './semifinale/semifinale.component';
import { FinaleComponent } from './finale/finale.component';
import { ClassificaComponent } from './classifica/classifica.component';

const routes: Routes = [
  {
   path: '',
   component: TournamentComponent
  },
  {
   path: 'ottavi-finale',
   component: OttaviComponent
  },
  {
   path: 'quarti-finale',
   component: QuartiComponent
  },
  {
   path: 'semi-finale',
   component: SemifinaleComponent
  },
  {
   path: 'finale',
   component: FinaleComponent
  },
  {
   path: 'classifica',
   component: ClassificaComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
