import {Controller, Get, Post, Body, HttpException, HttpStatus, Session} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login-dto";
import {UserService} from "../user/user.service";
import session, {SessionData} from "express-session";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}
    @Post('login')
    async login(
        @Session() session: SessionData,
        @Body() loginDto: LoginDto) {
        //console.log(`Received login request for username: ${loginDto.username}`);
        const user = await this.authService.login(loginDto.username, loginDto.password);

        if (user) {
            session.isLoggedIn = true;
            console.log(user.username)
            return user;
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('logout')
    logout(@Session() session: SessionData): void {
        session.isLoggedIn = undefined;
    }

    @Get('')
    async getAuthSession(@Session() session: SessionData) {
        session.visits = session.visits ? session.visits + 1 : 1;
        console.log("session", session.isLoggedIn);
        return { isLoggedIn: !!session.isLoggedIn };
    }
}

