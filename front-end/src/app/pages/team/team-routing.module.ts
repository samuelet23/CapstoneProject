import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { CreatedComponent } from './created/created.component';
import { ExistingComponent } from './existing/existing.component';
import { UpdatedComponent } from './updated/updated.component';
import { PlayersComponent } from './players/players.component';
import { LogoComponent } from './logo/logo.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: NotFoundComponent },
  {
    path: 'create/tournament/:name',
    component: CreatedComponent,
   },
  {
    path: 'existing/tournament/:name',
    component: ExistingComponent,
  },
  { path: 'player/:name', component: PlayersComponent },
  {
  path: 'player/:name/uploadLogo',
  component: LogoComponent
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
