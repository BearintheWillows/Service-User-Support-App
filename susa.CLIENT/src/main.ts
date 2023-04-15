import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {ErrorHandlerService} from "./app/services/error-handler.service";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService},
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideHttpClient(),


  ],
});
