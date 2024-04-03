import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    create(message: string, location: string, status: string, image: string | null){
        /* TODO - Relationship with User */
        const post = this.repo.create({ message, location, status, image});
        return this.repo.save(post);
    }
}
