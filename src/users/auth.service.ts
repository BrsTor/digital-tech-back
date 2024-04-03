import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async signUp(userDto :CreateUserDto) {
        //Check if username is in use
        const user = await this.usersService.findOneByUsername(userDto.username);

        //If exist an user with that username throw BadRequestException
        if (user) {
            throw new BadRequestException('username already exist');
        }
        const newUser = await this.usersService.create(userDto);
        return newUser;
    }

    async signIn(username: string) {
        //Check if user exist
        const user = await this.usersService.findOneByUsername(username)

        //If user doesn't exist throw BadRequestException
        if (!user) {
            throw new BadRequestException('username do not exist');
        }
        return user;
    }
}
