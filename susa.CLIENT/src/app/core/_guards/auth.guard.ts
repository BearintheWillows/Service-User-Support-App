import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
  createUrlTreeFromSnapshot,
  Router
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot  ) => {
  const authService = inject(AuthenticationService);
   const router = inject(Router);
  if(authService.isAuthenticated()){
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

  return false;
};
