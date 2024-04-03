import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private repo: Repository<Post>) { }

    create(postDto: CreatePostDto, user: User) {
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

    async findOneById(id: number) {
        const post = await this.repo.findOne({
            relations: ['author'],
            where: { id }
        })
        return post
    }

    async find() {
        const post = await this.repo.find({
            relations: ['author'],
            where: {status: Not('deleted')}
        })
        return post
    }

    async findPublished() {
        const post = await this.repo.find({
            relations: ['author'],
            where: { status: 'published' },
            order: { created_at: "DESC" }
        })
        return post
    }

    @UseGuards(AdminGuard)
    async findDrafted() {
        const post = await this.repo.find({
            relations: ['author'],
            where: { status: 'drafted' },
            order: { created_at: "ASC" }
        })
        return post
    }

    delete(post: Post) {
        post.status = 'deleted'
        return this.repo.save(post)
    }
}
