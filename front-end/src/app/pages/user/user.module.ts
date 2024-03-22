import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfiloComponent } from './profilo/profilo.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    UserComponent,
    AllUserComponent,
    ProfiloComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
