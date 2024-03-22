import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [

  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },

  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuard]
  },

  {
    path: 'tournament',
    loadChildren: () => import('./pages/tournament/tournament.module').then(m => m.TournamentModule),
    canActivate:[AuthGuard]
  },

  {
    path: 'game/:id',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
    canActivate:[AuthGuard]
  },


  {
  path: 'team',
  loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule),
  canActivate:[AuthGuard]
},

  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate:[AuthGuard]

  },

    { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }];

  // canActivate: [AuthGuard] aggiungere questo a tutte le rotte che hanno bisogno dell'autenticazione
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
