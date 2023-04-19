import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  AuthenticationFormComponent
} from "../../../../auth/components/authentication-form/authentication-form.component";
import {AuthenticationService} from "../../../../../core/services/authentication.service";
import {IUserForRegistrationDto} from "../../../../auth/_interfaces/iUserForRegistrationDto";
import {HttpErrorResponse} from "@angular/common/http";

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

  claims: [] = [];

  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

}

public getClaims = () => {
  this.authService.getClaims().subscribe({
    next : (claims) => {
      this.claims = claims as [];
    },
    error: (err) => {
      console.log(err);
    }
  });
}


public registerUser = ($event: IUserForRegistrationDto) =>{
  const user: IUserForRegistrationDto = $event;

  this.authService.registerUser(user).subscribe({
    next: (_) => console.log('User registered successfully'),
    error: (error: HttpErrorResponse) =>
    {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
    }}
  )
}

}
