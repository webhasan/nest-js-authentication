import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() info: LoginUserDto) {
        return this.authService.login(info);
    }

    @Post('register')
    register(@Body() body: RegisterUserDto) {
        return this.authService.register({
            email: body.email,
            username: body.username,
            password: body.password
        });
    }
}
