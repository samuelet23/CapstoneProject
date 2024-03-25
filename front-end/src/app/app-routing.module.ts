import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },

  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'tournament',
    loadChildren: () => import('./pages/tournament/tournament.module').then(m => m.TournamentModule),
  },

  {
    path: 'game/:id',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
    canActivate:[RoleGuard],
  },


  {
  path: 'team',
  loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule),
  canActivate:[RoleGuard],
},

  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },

    { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
