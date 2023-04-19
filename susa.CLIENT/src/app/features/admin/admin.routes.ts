import { Route } from '@angular/router';
import {RegisterUserPage} from "../auth/pages/register-user/register-user.page";

export const Admin_Routes: Route[] = [
  {
    path     : 'register-user',
    component: RegisterUserPage,
  }

];
