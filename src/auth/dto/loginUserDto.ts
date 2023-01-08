import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    usernameOrEmail: string;

    @IsNotEmpty()
    password: string;
}