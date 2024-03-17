import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { CreatedComponent } from './created/created.component';
import { ExistingComponent } from './existing/existing.component';
import { PlayerComponent } from '../player/player.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
  { path: 'create', component: CreatedComponent },
  { path: 'existing', component: ExistingComponent },
  { path: ' /:id', component: PlayerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
