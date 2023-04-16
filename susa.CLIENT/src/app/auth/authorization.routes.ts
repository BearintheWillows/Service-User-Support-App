import { Route } from "@angular/router";
import { RegisterUserPage } from "./register-user/register-user.page";
import { LoginUserPage } from "./login-user/login-user.page";

export const Auth_Routes: Route[] = [
    {
        path: 'register-user', component: RegisterUserPage, 
    },
    {
        path: 'login', component: LoginUserPage,
    }
  ];
  