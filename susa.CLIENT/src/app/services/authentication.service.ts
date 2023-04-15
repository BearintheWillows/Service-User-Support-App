import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { IUserForRegistrationDto } from '../auth/_interfaces/iUserForRegistrationDto';
import { IRegistrationResponseDto } from '../auth/_interfaces/iRegistrationResponseDto';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiRouteBuilderService } from './route-builder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<IUserForRegistrationDto | null> = new BehaviorSubject<IUserForRegistrationDto | null>(null);

  constructor(private http: HttpClient, private routeBuilderService: ApiRouteBuilderService) { }

  public isAuthenticated(): Observable<boolean>{
    return this.userSubject.asObservable().pipe(map(user => user !== null));
  }

  public registerUser = (body: IUserForRegistrationDto) => {
    console.log(this.routeBuilderService.endpoints.auth.register)
    return this.http.post<IRegistrationResponseDto>(this.routeBuilderService.endpoints.auth.register, body);
  }
}
