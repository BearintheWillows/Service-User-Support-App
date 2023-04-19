import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {AuthGuard} from "./features/auth/_guards/auth.guard";
import {AdminGuard} from "./features/admin/_guards/admin.guard";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
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
    loadChildren: () => import('./features/admin/admin.routes').then( m => m.Admin_Routes),
    canActivateChild: [AuthGuard, AdminGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/authorization.routes').then( m => m.Auth_Routes)
  }
];
