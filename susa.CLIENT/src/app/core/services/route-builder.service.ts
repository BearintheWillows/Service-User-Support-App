import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRouteBuilderService {

  constructor() { }

  private apiUrl: string = environment.url;

  endpoints = {
    auth: {
      register: `${this.apiUrl}/accounts/register`,
      login: `${this.apiUrl}/accounts/login`
    },
    user: {
      getUser: `${this.apiUrl}/user`
    },
    admin:{
      getClaims: `${this.apiUrl}/admin/claims`
    }
  };

}

