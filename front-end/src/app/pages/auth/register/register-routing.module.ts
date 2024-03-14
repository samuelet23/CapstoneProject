import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { RegisterCaptainComponent } from './register-captain/register-captain.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'user', component: RegisterUserComponent },
  { path: 'captain', component: RegisterCaptainComponent },
  { path: 'manager', component: RegisterManagerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
