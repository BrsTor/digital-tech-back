import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class PostDetailedDto {
    @Expose()
    id: number;

    @Expose()
    message: string;

    @Expose()
    created_at: Date;

    @Expose()
    location: string;

    @Expose()
    status: string;

    @Expose()
    image: string;

    @Transform(({ obj }) => obj.author.username)
    @Expose()
    author: User;

    @Transform(({ obj }) => obj.likes.map(user => user.username))
    @Expose()
    likes: Array<User>;
}