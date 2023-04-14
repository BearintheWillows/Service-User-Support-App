import { Route } from "@angular/router";
import { RegisterUserPage } from "./register-user/register-user.page";

export const Auth_Routes: Route[] = [
    {
        path: 'register-user', component: RegisterUserPage, 
    }
  ];
  