import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ErrorHandlerInterceptor} from "./app/core/_interceptors/error-handler.interceptor";
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'process';


if (environment.production) {
  enableProdMode();
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot({}),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:5006'],
          disallowedRoutes: []
        }
      })
      ),



  ]
});


