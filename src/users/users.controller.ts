import { Controller, Post, Body, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.usersService.create(body.name, body.surname, body.username, body.role, body.avatar);
        return user;
    }

    @Get('/:id')
    async findUserById(@Param('id') id: string) {
        const user = await this.usersService.findOneById(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }

    @Get('')
    async findUserByUsername(@Query('username') username: string) {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }
}
