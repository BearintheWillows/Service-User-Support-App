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
      import('./features/folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profiles/user-profile/user-profile.page').then( m => m.UserProfilePage)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/user/admin/admin.routes').then( m => m.Admin_Routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/authorization.routes').then( m => m.Auth_Routes)
  }
];
