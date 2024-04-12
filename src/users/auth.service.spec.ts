import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
	let service: AuthService;
	let fakeUsersService: Partial<UsersService>;

	beforeEach(async () => {
		const users: User[] = [];

		fakeUsersService = {
			findOneById: (id: number) => {
				const filteredUsers = users.find((user) => user.id === id);
				return Promise.resolve(filteredUsers);
			},
			findOneByUsername: (username: string) => {
				const filteredUsers = users.find((user) => user.username === username);
				return Promise.resolve(filteredUsers);
			},
			create: (userDto: CreateUserDto) => {
				const user = {
					id: Math.floor(Math.random() * 999999),
					name: userDto.name,
					surname: userDto.surname,
					username: userDto.username,
					role: userDto.role,
					avatar: userDto.avatar,
					posts: {},
				} as User;
				users.push(user);
				return Promise.resolve(user);
			},
		};

		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: fakeUsersService,
				},
			],
		}).compile();

		service = module.get(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('creates a new user', async () => {
		const userDto = {
			name: 'name',
			surname: 'surname',
			username: 'usernamenotused',
			role: 'user',
			avatar: 'avatarurl'

		} as CreateUserDto
		const user = await service.signUp(userDto);
		expect(user).toBeDefined()
	})

	it('throws an error if user signs up with username that is in use', async () => {
		const userDto = {
			name: 'name',
			surname: 'surname',
			username: 'admin',
			role: 'user',
			avatar: 'avatarurl'

		} as CreateUserDto
		await service.signUp(userDto);
		await expect(service.signUp(userDto)).rejects.toThrow(
			BadRequestException
		)
	})

	it('throws an error if signin is called with an unused username', async () => {
		await expect(
		  service.signIn('notusedusername'),
		).rejects.toThrow(NotFoundException);
	  });
});
