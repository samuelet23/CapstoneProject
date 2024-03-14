import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  form!:FormGroup;


  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['', [Validators.email]],
      password:['', [Validators.required, Validators.minLength(7)]]
    })
  }



  access(){}

}
