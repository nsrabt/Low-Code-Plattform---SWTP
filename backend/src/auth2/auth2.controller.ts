import {
    Body, Controller, Get, Post, Session,
    UnauthorizedException
} from '@nestjs/common';
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
        let user;
        if (body.username == 'professor' && body.password === '1') {
            session.isLoggedIn = true;
            console.log(body.username)
            user = await this.userService.addUser({
                username: body.username,
                eMail: "prof@mail.com",
                name: "prof"
            });
            session.user = user;
        }
        else if (body.username == 'student' && body.password === '2') {
            session.isLoggedIn = true;
            console.log(body.username)
            user = await this.userService.addUser({
                username: body.username,
                eMail: "studi@mail.com",
                name: "stud"

            });
            session.user = user;
        }
        else if (body.username == 'dekanat' && body.password === '3') {
            session.isLoggedIn = true;
            console.log(body.username)
            user = await this.userService.addUser({
                username: body.username,
                eMail: "dekanat@mail.com",
                name: "dknt"

            });
            session.user = user;
        }
        else {
            throw new UnauthorizedException('Benutzername oder Passwort falsch');
        }

        return user;

    }
    @Post('logout')
    logout(@Session() session: SessionData): void {
        session.isLoggedIn = undefined;
        session.user = undefined;
    }
    @Get('')
    async getAuthSession(@Session() session: SessionData) {
        //session.visits = session.visits ? session.visits + 1 : 1;
        //console.log("session", session.cookie);
        return { isLoggedIn: !!session.isLoggedIn };
    }
}
