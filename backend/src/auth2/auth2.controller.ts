import { Body, Controller, Post, Session,
    UnauthorizedException } from '@nestjs/common';
import { SessionData } from "express-session";
@Controller('auth2')
export class Auth2Controller {
    @Post('login')
    login(
        @Session() session: SessionData,
        @Body() body: { username: string, password: string },
    ): void {
        if (body.username == 'admin' && body.password === 'sicheresPasswort') {
            session.isLoggedIn = true;
        } else {
            throw new UnauthorizedException('Benutzername oder Passwort falsch');
        }
    }
    @Post('logout')
    logout(@Session() session: SessionData): void {
        session.isLoggedIn = undefined;
    }
}
