import { Route } from "@angular/router";
import { RegisterUserPage } from "./admin/pages/register-user/register-user.page";
import { LoginUserPage } from "./user/pages/login-user/login-user.page";

export const Auth_Routes: Route[] = [
    {
        path: 'register-user', component: RegisterUserPage, 
    },
    {
        path: 'login', component: LoginUserPage,
    }
  ];
  