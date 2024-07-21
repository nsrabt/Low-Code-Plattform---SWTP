import { Body, Controller, Post, Session,
    UnauthorizedException } from '@nestjs/common';
import { SessionData } from "express-session";
import {UserService} from "../user/user.service";
@Controller('auth2')
export class Auth2Controller {
    constructor(
        private readonly userService: UserService
    ) {
    }
    @Post('login')
    async login(
        @Session() session: SessionData,
        @Body() body: { username: string, password: string },
    ) {
        if (body.username == 'admin' && body.password === 'sicheresPasswort') {
            session.isLoggedIn = true;
            console.log(body.username)
            return await this.userService.addUser({
                username: body.username,
                eMail: "fake@mail.com"
            })
        } else {
            throw new UnauthorizedException('Benutzername oder Passwort falsch');
        }

    }
    @Post('logout')
    logout(@Session() session: SessionData): void {
        session.isLoggedIn = undefined;
    }
}
