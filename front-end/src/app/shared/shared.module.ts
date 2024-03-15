import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from '../components/nav/nav.component';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';



@NgModule({
  declarations: [
    NavComponent,
    RegisterPageComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    NavComponent,
    RegisterPageComponent,
    FooterComponent,
    SpinnerComponent,

  ]
})
export class SharedModule { }
