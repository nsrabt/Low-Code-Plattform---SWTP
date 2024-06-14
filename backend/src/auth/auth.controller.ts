import {Controller, Get,Post,Body} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login-dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post()
    async login(@Body() loginDto: LoginDto) {
        console.log(`Received login request for username: ${loginDto.username}`);

        const isAuthenticated = await this.authService.authenticateUser(loginDto.username, loginDto.password);
        if (isAuthenticated) {
            return { message: 'Authentication successful' };
        } else {
            return { message: 'Authentication failed' };
        }
    }
}

