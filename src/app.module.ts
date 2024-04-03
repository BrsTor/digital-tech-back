import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User],
            synchronize: true,
        }),
        UsersModule,
        PostsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
