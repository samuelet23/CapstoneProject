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
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TournamentComponent,
    OttaviComponent,
    QuartiComponent,
    SemifinaleComponent,
    FinaleComponent,
    ClassificaComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TournamentModule { }
