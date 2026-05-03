import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string): Promise<any> {

        const usuario = await this.userService.findOneByEmail(email);

        if (!usuario) {
            throw new HttpException('Usuario no encontrado', 404);
        }

        const verificarPass = await compare(password, usuario.password);

        if (!verificarPass) {
            throw new HttpException('Contraseña Incorrecta', 401);
        }

        // 🔥 FIX IMPORTANTE
        const payload = {
            sub: usuario.id,            // ✔ estándar JWT
            email: usuario.email,       // ✔ correcto
            username: usuario.username,
            roles: usuario.roles.map(r => r.name)
        };

        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
                roles: usuario.roles.map(r => r.name)
            }
        };
    }

    async getProfile(id: string) {
        return this.userService.findOne(id);
    }
}