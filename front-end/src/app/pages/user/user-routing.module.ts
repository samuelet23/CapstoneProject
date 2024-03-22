import { AllUserComponent } from './all-user/all-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [

  { path: 'modifica/:username', component: UserComponent },
  { path: 'profilo/:username', component: ProfiloComponent },
  { path: 'modifica/password/:username', component: PasswordComponent },
  { path: 'get/all', component: AllUserComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
