import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { Match } from "src/auth/match.decorator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @Min(0)
    password: string;

    @Match('password', {message: 'Does not match confirm password with password'})
    confirmPassword: string;
}