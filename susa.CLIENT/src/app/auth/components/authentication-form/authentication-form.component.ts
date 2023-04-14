import { AfterContentInit, Component, OnInit, SimpleChange } from '@angular/core';
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
export class AuthenticationFormComponent implements OnInit{
  authForm: FormGroup = new FormGroup({});
  isLoginMode:boolean = true;
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';


  constructor(private formBuilder: FormBuilder) {

   }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)] ],
      confirmPassword: ['', Validators.required],
  })

  this.emailErrorTextUpdate();
  this.passwordErrorTextUpdate();
  this.confirmPasswordErrorTextUpdate();
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

  private emailErrorTextUpdate = () => {
    this.authForm.controls['email'].valueChanges.subscribe((value) => {
  
      this.authForm.controls['email'].updateValueAndValidity({emitEvent: false});
  
      if (this.authForm.controls['email'].invalid ) {
    
      const errors = this.authForm.controls['email'].errors;
      
      if(errors){
        if (errors['required']) {
          this.emailError = 'Email is required';
        } else if (errors['email']) {
          this.emailError = 'Email is invalid';
        } 
      }
      }
    });
  }

  private passwordErrorTextUpdate = () => {
    this.authForm.controls['password'].valueChanges.subscribe((value) => {
  
      this.authForm.controls['password'].updateValueAndValidity({emitEvent: false});
  
      if (this.authForm.controls['password'].invalid) {
    
      const errors = this.authForm.controls['password'].errors;
      
      if(errors){
        if (errors['required']) {
          this.passwordError = 'Password is required';
        } else if (errors['minlength']) {
          this.passwordError = 'Password must be at least 6 characters';
        } 
      }
      }
    });
  }

  private confirmPasswordErrorTextUpdate = () => {
    this.authForm.controls['confirmPassword'].valueChanges.subscribe((value) => {
  
      this.authForm.controls['confirmPassword'].updateValueAndValidity({emitEvent: false});
  
      if (this.authForm.controls['confirmPassword'].invalid) {
    
      const errors = this.authForm.controls['confirmPassword'].errors;
      
      if(errors){
        if (errors['required']) {
          this.confirmPasswordError = 'Confirm Password is required';
        } 
      }
      }
    });
  }
}
