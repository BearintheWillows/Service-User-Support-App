import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUserForRegistrationDto } from '../_interfaces/iUserForRegistrationDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationFormComponent } from '../components/authentication-form/authentication-form.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    AuthenticationFormComponent],
})
export class RegisterUserPage implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  
}


public registerUser = (registerFormValue: any) => {
  const formValues = { ...registerFormValue };

  const user: IUserForRegistrationDto = {
    email: formValues['email'],
    password: formValues['password'],
    confirmPassword: formValues['confirmPassword'],
  };

  this.authService.registerUser(user).subscribe({
    next: (_) => console.log('User registered successfully'),
    error: (error: HttpErrorResponse) => console.log(error.error.errors)}
  )
}

}
