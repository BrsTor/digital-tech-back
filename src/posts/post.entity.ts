import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
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

    /* TODO - Relationship with User */
}
