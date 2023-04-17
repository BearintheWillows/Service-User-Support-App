import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationFormComponent } from "../../../components/authentication-form/authentication-form.component";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IUserForAuthenticationDto } from 'src/app/auth/_interfaces/iUserForAuthenticationDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthenticationResponseDto } from 'src/app/auth/_interfaces/iAuthenticationResponseDto';

@Component({
    selector: 'app-login',
    templateUrl: './login-user.page.html',
    styleUrls: ['./login-user.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, AuthenticationFormComponent]
})
export class LoginUserPage implements OnInit {

  errorMessage: string = '';
  showErrorMessage: boolean = false;
  returnUrl: string = '';

  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public loginUser = ($event: IUserForAuthenticationDto) => {
    const user: IUserForAuthenticationDto = $event;

    this.authService.loginUser(user).subscribe({
      next: (res: IAuthenticationResponseDto) => {
        console.log('User logged in successfully');
        localStorage.setItem('token', res.token);
        this.router.navigate([this.returnUrl]);
      },
      error: (error: HttpErrorResponse) =>
      {
        this.errorMessage = error.message;
        this.showErrorMessage = true;
      }}
    )
  }

}
