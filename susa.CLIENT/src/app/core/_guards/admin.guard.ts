import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const AdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot  ) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if(authService.isUserAdmin()){
    return true;
  }

  router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url } });

  return false;
};
