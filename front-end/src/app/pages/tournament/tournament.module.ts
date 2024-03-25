import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { SharedModule } from '../../shared/shared.module';
import { ClassificaComponent } from './classifica/classifica.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllTournamentsComponent } from './all-tournaments/all-tournaments.component';
import { ProvinceTournamentComponent } from './province-tournament/province-tournament.component';
import { RoundsComponent } from '../../components/rounds/rounds.component';


@NgModule({
  declarations: [
    TournamentComponent,
    ClassificaComponent,
    AllTournamentsComponent,
    CreateComponent,
    ProvinceTournamentComponent,
    RoundsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TournamentModule { }
