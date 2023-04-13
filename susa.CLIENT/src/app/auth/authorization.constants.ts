
export const LogoutActions = {
    Logout: 'logout',
  };
  
export const LoginActions = {
    Login: 'login',
    Register: 'register'
  };
  
let applicationPaths: IApplicationPathsType = {
    Register: `auth/${LoginActions.Register}`,
  }
  
interface IApplicationPathsType {
    readonly Register: string;
  }

  export const ApplicationPaths: IApplicationPathsType = applicationPaths;