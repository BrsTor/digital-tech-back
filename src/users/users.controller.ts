import { Controller, Post, Body, Get, Param, NotFoundException, Query, Session, HttpCode, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body: SignInUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.username);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    signOut(@Session() session: any) {
        if (!session.userId) {
            throw new NotFoundException('session cookie not found')
        }
        session.userId = null;
        return true;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async findUserById(@Param('id') id: string) {
        const user = await this.usersService.findOneById(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }

    @Get('')
    @UseGuards(AuthGuard)
    async findUserByUsername(@Query('username') username: string) {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }
}
