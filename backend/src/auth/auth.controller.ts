import {Controller, Get,Post,Body} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login-dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        console.log(`Received login request for username: ${loginDto.username}`);
        const user = await this.authService.login(loginDto.username, loginDto.password);

        if (user) {
            console.log("user auth token", user.id);
            return user;
        } else {

            return null;
        }
    }
}

