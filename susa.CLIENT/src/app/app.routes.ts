import { Routes } from '@angular/router';
import { LoginUserPage } from './features/auth/pages/login-user/login-user.page';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/_guards/auth.guard';
import {AdminGuard} from "./core/_guards/admin.guard";

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
    loadChildren: () => import('./features/user/admin/admin.routes').then( m => m.Admin_Routes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/authorization.routes').then( m => m.Auth_Routes)
  }
];
