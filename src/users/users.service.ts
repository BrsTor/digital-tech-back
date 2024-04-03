import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(name: string, surname: string, username: string, role: string, avatar: string | null) {
        const user = this.repo.create({ name, surname, username, role, avatar });
        return this.repo.save(user);
    }

    findOneById(id: number) {
        return this.repo.findOneBy({ id });
    }

    findOneByUsername(username: string) {
        return this.repo.findOneBy({ username })
    }

}
