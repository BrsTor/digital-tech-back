import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    createPost(@Body() body: CreatePostDto) {
        /* TODO - Relationship with User */
        return this.postsService.create(body.message, body.location, body.status, body.image);
    }
}
