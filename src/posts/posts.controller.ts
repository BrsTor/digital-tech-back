import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostDto } from './dtos/post.dto';
import { PatchPostStatusDto } from './dtos/patch-post-status';
import { AdminGuard } from 'src/guards/admin.guard';

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

    @Patch('/:id')
    @UseGuards(AdminGuard)
    chageStatus(@Param('id') id: string, @Body() body: PatchPostStatusDto) {
        return this.postsService.patchStatus(parseInt(id), body.status);
    }
}
