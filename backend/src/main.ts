import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import session from 'express-session';

declare module "express-session" {
    interface SessionData {
        isLoggedIn?: boolean;
        visits?: number;
    }
}
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(
        session({
            secret: 'WJFNJKFNYAFNFNANKJRLAOKOWESDMNF',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
            }
        }),
    );
    // Aktiviert CORS
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();