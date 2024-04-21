import {
    Controller,
    Bind,
    Request,
    Post,
    UseGuards,
    Dependencies, Get
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Dependencies(AuthService)
@Controller()
export class AppController {
    constructor(private authService: AuthService) {
        this.authService = authService;
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @Bind(Request())
    async login(req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @Bind(Request())
    getProfile(req) {
        return req.user;
    }
}
