import { Route } from '@angular/router';

export const Admin_Routes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('../auth/authorization.routes').then(m => m.Auth_Routes)
      },
  ];
  