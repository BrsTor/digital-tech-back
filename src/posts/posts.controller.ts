import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    createPost(@Body() body: CreatePostDto) {
        /* TODO - Relationship with User */
        return this.postsService.create(body.message, body.location, body.status, body.image);
    }
}
