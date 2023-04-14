import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [IonicModule,CommonModule, ReactiveFormsModule],
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {
  authForm: FormGroup = new FormGroup({});
  isLoginMode:boolean = true;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
  });

  } 

  public validateControl = (controlName: string) => {
    return this.authForm.controls[controlName].invalid && this.authForm.controls[controlName].touched;
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.authForm.controls[controlName].hasError(errorName);
  }

  public submitForm = (authFormValue: any) => {
    const formValues = { ...authFormValue };
    console.log(formValues);
  }
}
