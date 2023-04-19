import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {ApiRouteBuilderService} from "./route-builder.service";

import {IRegistrationResponseDto} from "../../features/auth/_interfaces/iRegistrationResponseDto";
import {IUserForRegistrationDto} from "../../features/auth/_interfaces/iUserForRegistrationDto";
import {IUserForAuthenticationDto} from "../../features/auth/_interfaces/iUserForAuthenticationDto";
import {IAuthenticationResponseDto} from "../../features/auth/_interfaces/iAuthenticationResponseDto";
import {IUser} from "../../features/user/_interfaces/iUser";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelper = inject(JwtHelperService)

  private authStatusListener = new BehaviorSubject<boolean>(false);
  public authStatusListener$ = this.authStatusListener.asObservable();

  constructor(private http: HttpClient, private routeBuilderService: ApiRouteBuilderService) { }


  public registerUser = (body: IUserForRegistrationDto) => {
    return this.http.post<IRegistrationResponseDto>(this.routeBuilderService.endpoints.auth.register, body);
  }

  public loginUser = (body: IUserForAuthenticationDto) => {
    return this.http.post<IAuthenticationResponseDto>(this.routeBuilderService.endpoints.auth.login, body)
}

  public changeAuthenticationStatus = (isAuthenticated: boolean) => {
    this.authStatusListener.next(isAuthenticated);
}

  public logout() {
    localStorage.removeItem('token');
    this.changeAuthenticationStatus(false);
  }

  public isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    return !!(token && !this.jwtHelper.isTokenExpired(token));
  }

  public getClaims = () => {
    return this.http.get(this.routeBuilderService.endpoints.admin.getClaims);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role === 'Admin';
    }
    return false;


  }
}
