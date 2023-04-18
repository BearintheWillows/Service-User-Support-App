import {IUser} from "../../user/_interfaces/iUser";

export interface IAuthenticationResponseDto {
    token: string;
    isSuccessful: boolean;
    errorMessage: string;
    user: IUser;
}
