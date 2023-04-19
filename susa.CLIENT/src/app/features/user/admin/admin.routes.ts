import { Route } from '@angular/router';
import {RegisterUserPage} from "./pages/register-user/register-user.page";
import {AuthGuard} from "../../../core/_guards/auth.guard";
import {AdminGuard} from "../../../core/_guards/admin.guard";

export const Admin_Routes: Route[] = [
    {
        path: 'register-user',
        component: RegisterUserPage,

      },
  ];
