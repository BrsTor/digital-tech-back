import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

export const status = ['drafted', 'deleted', 'published']

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    created_at: Date;

    @Column()
    location: string;

    @Column({ default: 'drafted' })
    status: string;

    @Column({ nullable: true })
    image: string;

    /* TODO - Relationship with User */
}
