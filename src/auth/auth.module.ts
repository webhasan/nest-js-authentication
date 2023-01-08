import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
dotenv.config()

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRE_IN }
    }),
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
