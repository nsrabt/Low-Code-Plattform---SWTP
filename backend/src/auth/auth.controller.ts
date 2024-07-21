import {Controller, Get, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login-dto";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        //console.log(`Received login request for username: ${loginDto.username}`);
        const user = await this.authService.login(loginDto.username, loginDto.password);

        if (user) {
            console.log(user.username)
            return user;
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}

