import { AuthGuard } from './../../guards/auth.guard';
import { AllUserComponent } from './all-user/all-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { PasswordComponent } from './password/password.component';
import { RoleGuard } from '../../guards/role.guard';

const routes: Routes = [
  {
    path: 'modifica/:username',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profilo/:username',
    component: ProfiloComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modifica/password/:username',
    component: PasswordComponent,
    canActivate: [AuthGuard],
  },

  { path: 'get/all', component: AllUserComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
