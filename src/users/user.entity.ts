import { Post } from 'src/posts/post.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

export const roles = ['admin', 'user']

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    username: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
