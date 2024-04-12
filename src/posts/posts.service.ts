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
            relations: ['author', 'likes'],
            where: { id }
        })
        return post
    }

    async find() {
        const post = await this.repo.find({
            relations: ['author', 'likes'],
            where: { status: Not('deleted') }
        })
        return post
    }

    async findPublished() {
        const post = await this.repo.find({
            relations: ['author', 'likes'],
            where: { status: 'published' },
            order: { created_at: "DESC" }
        })
        return post
    }

    @UseGuards(AdminGuard)
    async findDrafted() {
        const post = await this.repo.find({
            relations: ['author', 'likes'],
            where: { status: 'drafted' },
            order: { created_at: "ASC" }
        })
        return post
    }

    delete(post: Post) {
        post.status = 'deleted'
        return this.repo.save(post)
    }

    async likePost(id: number, user: User): Promise<Post> {
        const post = await this.repo.findOne({
            relations: ['author', 'likes'],
            where: { id }
        });

        if (!post) {
            throw new NotFoundException('post not found')
        }

        // Check if the user has already liked the post
        const userIndex = post.likes.findIndex((u) => u.id === user.id);
        if (userIndex === -1) {
            post.likes.push(user);
        }

        return this.repo.save(post);
    }

    async unlikePost(id: number, user: User): Promise<Post> {
        const post = await this.repo.findOne({
            relations: ['author', 'likes'],
            where: { id }
        });

        if (!post) {
            throw new Error('Post not found');
        }

        // Remove user from the likes array
        post.likes = post.likes.filter((u) => u.id !== user.id);

        return this.repo.save(post);
    }
}
