import { Route } from "@angular/router";
import {LoginUserPage} from "./pages/login-user/login-user.page";

export const Auth_Routes: Route[] = [
    {
        path: 'login', component: LoginUserPage,
    }
  ];
