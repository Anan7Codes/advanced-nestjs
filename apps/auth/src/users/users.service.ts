import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const hashPassowrd = await bcrypt.hash(createUserDto.password, 10);
        console.log("ahash" + hashPassowrd, createUserDto.password);
        return this.usersRepository.create({
            ...createUserDto,
            password: hashPassowrd,
        });
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        console.log("users" + user.email, user.password);
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log("password valid" + passwordIsValid, password, user.password);
        if(!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
