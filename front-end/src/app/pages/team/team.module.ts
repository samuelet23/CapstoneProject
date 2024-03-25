import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { CreatedComponent } from './created/created.component';
import { ExistingComponent } from './existing/existing.component';
import { PlayersComponent } from './players/players.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatedComponent } from './updated/updated.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  declarations: [
    TeamComponent,
    CreatedComponent,
    ExistingComponent,
    PlayersComponent,
    UpdatedComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TeamModule { }
