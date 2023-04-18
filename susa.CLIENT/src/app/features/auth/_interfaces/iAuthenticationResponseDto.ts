import {IUser} from "../../user/_interfaces/iUser";

export interface IAuthenticationResponseDto {
    token: string;
    isAuthenticationSuccessful: boolean;
    errorMessage: string;
    user: IUser;
}
