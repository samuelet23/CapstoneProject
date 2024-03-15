import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterCaptainComponent } from './register-captain/register-captain.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterPageComponent } from '../../../components/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterUserComponent,
    RegisterCaptainComponent,
    RegisterManagerComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ]
})
export class RegisterModule { }
