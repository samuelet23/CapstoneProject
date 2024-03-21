import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { CreatedComponent } from './created/created.component';
import { ExistingComponent } from './existing/existing.component';
import { UpdatedComponent } from './updated/updated.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
  { path: 'create/tournament/:name', component: CreatedComponent },
  { path: 'existing/tournament/:name', component: ExistingComponent },
  { path: 'player/:name', component: PlayersComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
