import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
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
}
