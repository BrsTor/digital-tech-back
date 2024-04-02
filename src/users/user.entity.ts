import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    username: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: true })
    avatar: string;
}
