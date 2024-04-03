import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    create(postDto: CreatePostDto, user: User){
        /* TODO - Relationship with User */
        const post = this.repo.create(postDto);
        post.author = user;
        return this.repo.save(post);
    }

    async patchStatus(id: number, status: string) {
        const post = await this.repo.findOneBy({ id });

        if (!post) {
            throw new NotFoundException('post not found')
        }

        post.status = status;
        return this.repo.save(post)
    }
}
