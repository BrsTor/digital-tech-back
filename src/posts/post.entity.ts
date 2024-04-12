import { User } from '../users/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';

export const status = ['drafted', 'deleted', 'published']

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    location: string;

    @Column({ default: 'drafted' })
    status: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => User, (user) => user.posts)
    author: User

    @ManyToMany(() => User)
    @JoinTable()
    likes: User[];
}
