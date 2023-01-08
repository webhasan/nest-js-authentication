import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(protected userService: UsersService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
       return req.user;
    }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getUsers() {
        return this.userService.getUsers();
    }
}
