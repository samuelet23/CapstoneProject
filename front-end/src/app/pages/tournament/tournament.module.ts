import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { SharedModule } from '../../shared/shared.module';
import { OttaviComponent } from './ottavi/ottavi.component';
import { QuartiComponent } from './quarti/quarti.component';
import { SemifinaleComponent } from './semifinale/semifinale.component';
import { FinaleComponent } from './finale/finale.component';
import { ClassificaComponent } from './classifica/classifica.component';


@NgModule({
  declarations: [
    TournamentComponent,
    OttaviComponent,
    QuartiComponent,
    SemifinaleComponent,
    FinaleComponent,
    ClassificaComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule
  ]
})
export class TournamentModule { }
