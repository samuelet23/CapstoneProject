import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { SharedModule } from '../../shared/shared.module';
import { ClassificaComponent } from './classifica/classifica.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [
    TournamentComponent,
    ClassificaComponent,
    CreateComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TournamentModule { }
