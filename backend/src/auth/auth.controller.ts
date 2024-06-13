import {Controller, Get,Post,Body} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        console.log(`Received login request for username: ${username}`);

        const isAuthenticated = await this.authService.authenticateUser(username, password);
        if (isAuthenticated) {
            return { message: 'Authentication successful' };
        } else {
            return { message: 'Authentication failed' };
        }
    }
}

