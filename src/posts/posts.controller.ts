import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostDto } from './dtos/post.dto';
import { PatchPostStatusDto } from './dtos/patch-post-status';
import { AdminGuard } from 'src/guards/admin.guard';
import { PostDetailedDto } from './dtos/post-detailed.dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    @Serialize(PostDto)
    createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
        /* TODO - Relationship with User */
        return this.postsService.create(body, user);
    }

    @Get('id/:id')
    @Serialize(PostDetailedDto)
    async findPostDetailedById(@Param('id') id: string) {
        const post = await this.postsService.findOneById(parseInt(id));
        if (!post) {
            throw new NotFoundException('post not found')
        }
        return post
    }

    @Get()
    @Serialize(PostDetailedDto)
    async find() {
        const post = await this.postsService.find();
        if (post.length === 0) {
            throw new NotFoundException("There's no posts")
        }
        return post
    }

    @Get('published')
    @Serialize(PostDetailedDto)
    async findPublishedPostsDetailed() {
        const post = await this.postsService.findPublished();
        if (post.length === 0) {
            throw new NotFoundException("There's no post published")
        }
        return post
    }

    @Get('drafted')
    @Serialize(PostDetailedDto)
    @UseGuards(AdminGuard)
    async findDrafteddPostsDetailed() {
        const post = await this.postsService.findDrafted();
        if (post.length === 0) {
            throw new NotFoundException("There's no post published")
        }
        return post
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    chageStatus(@Param('id') id: string, @Body() body: PatchPostStatusDto) {
        return this.postsService.patchStatus(parseInt(id), body.status);
    }

    @Delete('/:id')
    @Serialize(PostDetailedDto)
    async removePost(@Param('id') id: string, @CurrentUser() user: User) {
        console.log(user.username)
        const post = await this.postsService.findOneById(parseInt(id));
        if (!post) {
            throw new NotFoundException('post not found');
        }
        if (post.author.username !== user.username) {
            throw new BadRequestException("post doesn't belong to that user");
        }
        return this.postsService.delete(post);
    }
}
