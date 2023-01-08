import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/role.enum';
import { dbErrorCode } from 'src/const/dbErrorCode';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: MongoRepository<User>,
    ) {}
    
    async findUserBy(param: Record<string, string>): Promise<User> {
        return await this.usersRepository.findOneBy(param);
    }

    async registerUser({email, username, password}: {email: string; username: string; password: string}): Promise<{id: string}> {
        let user = new User();

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        user.email = email;
        user.username = username;
        user.password = hashPassword;
        user.roles = [Role.User]

        try {
            const { id } = await this.usersRepository.save(user);
            return { id: id.toString() }
        }catch(err) {
            if(err.code === dbErrorCode.duplicateField) {
                let errorField = err.message.includes('username:') ? 'username' : 'email';
                throw new ConflictException(`${errorField} already exists.`);
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async getUsers() {
        let users = await this.usersRepository.find({})
        return users.map(({password, ...rest}) => rest);
    }
}
