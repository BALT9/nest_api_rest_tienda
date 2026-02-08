import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';

import { hash, compare } from 'bcrypt';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {

    }

    async signIn(email: string, password: string): Promise<any> {
        // buscar user por email
        const usuario = await this.userService.findOneByEmail(email);
        if (!usuario) {
            return new HttpException('Usuario no encontrado', 404);
        }

        const verificarPass = await compare(password, usuario.password);

        if(!verificarPass) throw new HttpException('Contraseña Incorrecta', 401);

        // 
    }
}
