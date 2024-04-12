import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(userDto: CreateUserDto) {
        const user = this.repo.create(userDto);
        return this.repo.save(user);
    }

    findOneById(id: number) {
        if (!id) {
            return null
        }
        return this.repo.findOneBy({ id });
    }

    findOneByUsername(username: string) {
        return this.repo.findOneBy({ username })
    }

}
