import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";
import { Match } from "src/auth/match.decorator"; // it is custom decorator

export class RegisterUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail({}, {message: 'need a valid email address'})
    email: string; 

    @MinLength(8)
    password: string;

    @Match('password', {message: 'password does not match with confirm password'})
    confirmPassword: string;
}