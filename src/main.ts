import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ 
        origin: 'http://localhost:4200', 
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })

    /* TODO - Refactor the cookie-session */
    app.use(cookieSession({
        keys: ['hfgklhfgkh']
    }))

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )

    await app.listen(3000);
}
bootstrap();
