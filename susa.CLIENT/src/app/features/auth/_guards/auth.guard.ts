import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, CanActivateChildFn
} from '@angular/router';
import {AuthenticationService} from "../../../core/services/authentication.service";


export const AuthGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot  ) => {
  const authService = inject(AuthenticationService);
   const router = inject(Router);
  if(authService.isAuthenticated()){
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

  return false;
};
