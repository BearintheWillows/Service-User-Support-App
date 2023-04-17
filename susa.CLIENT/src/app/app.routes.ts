import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profiles/user-profile/user-profile.page').then( m => m.UserProfilePage)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then( m => m.Admin_Routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/authorization.routes').then( m => m.Auth_Routes)
  }
];
