import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUsersService = {
            findOneById: (id: number) => {
                return Promise.resolve({ id } as User)
            },
            findOneByUsername: (username: string) => {
                return Promise.resolve({ username } as User)
            },
        };
        fakeAuthService = {
            /* signIn: () => {

            },
            signUp: () => {

            }, */
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findUserById return a User based on its id', async () => {
        const user = (await controller.findUserById('1')) as User;
        expect(user).toBeDefined();
    });

    it('findUserById return a User based on its username', async () => {
        const user = (await controller.findUserByUsername('test')) as User;
        expect(user).toBeDefined();
    });

});
