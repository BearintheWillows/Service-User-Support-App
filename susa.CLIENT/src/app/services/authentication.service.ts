import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {ApiRouteBuilderService} from "./route-builder.service";
import {UserService} from "./user.service";
import {IUserForRegistrationDto} from "../features/auth/_interfaces/iUserForRegistrationDto";
import {IRegistrationResponseDto} from "../features/auth/_interfaces/iRegistrationResponseDto";
import {IUserForAuthenticationDto} from "../features/auth/_interfaces/iUserForAuthenticationDto";
import {IAuthenticationResponseDto} from "../features/auth/_interfaces/iAuthenticationResponseDto";
import {IUser} from "../features/user/_interfaces/iUser";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authStatusListener = new BehaviorSubject<boolean>(false);
  public authStatusListener$ = this.authStatusListener.asObservable();

  constructor(private http: HttpClient, private routeBuilderService: ApiRouteBuilderService, private userService: UserService) { }


  public registerUser = (body: IUserForRegistrationDto) => {
    return this.http.post<IRegistrationResponseDto>(this.routeBuilderService.endpoints.auth.register, body);
  }

  public loginUser = (body: IUserForAuthenticationDto) => {
    return this.http.post<IAuthenticationResponseDto>(this.routeBuilderService.endpoints.auth.login, body)
}

  public changeAuthenticationStatus = (isAuthenticated: boolean, user: IUser) => {
    this.authStatusListener.next(isAuthenticated);

  }
}
