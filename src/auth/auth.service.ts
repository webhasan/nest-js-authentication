import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser({usernameOrEmail, password}: {usernameOrEmail: string, password: string}) {
        let user = await this.userService.findUserBy({username: usernameOrEmail});

        if(!user && usernameOrEmail.includes('@')) {
            user = await this.userService.findUserBy({email: usernameOrEmail});
        }

        if(!user) {
            return null;
        }

        const isMatch =  await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return null;
        }

        delete user.password;
        return user;
    }

    async login(loginInfo: {usernameOrEmail: string, password: string})  {
        let user = await this.validateUser(loginInfo);

        console.log('user information', user);

        if(!user) throw new HttpException('incorrect login credentials', HttpStatus.BAD_REQUEST);

        const payload = {id: user.id, email: user.email, username: user.username, roles: user.roles}

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    register(body: {email: string; username: string; password: string}) {
        return this.userService.registerUser({
            username: body.username,
            password: body.password,
            email: body.email
        });
    }
}
