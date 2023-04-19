import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiRouteBuilderService } from 'src/app/core/services/route-builder.service';
import { IUser } from './_interfaces/iUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  routeBuilder = inject(ApiRouteBuilderService);
  http = inject(HttpClient);


  public getUserName(): Observable<IUser> {
    return this.http.get<IUser>(this.routeBuilder.endpoints.user.getUser);
  }
    
}
