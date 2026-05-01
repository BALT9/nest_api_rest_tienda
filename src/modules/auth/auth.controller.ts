import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post("/login")
    funLogin(@Body() datos: LoginAuthDto) {
        return this.authService.signIn(datos.email, datos.password);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Req() req: any) {
        return req.user;
    }
}
