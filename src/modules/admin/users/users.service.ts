import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { rolesIds, email, username, ...rest } = createUserDto;

    // verficar si ya exiten un username 
    const existeUsername = await this.userRepository.findOne({
      where: {username}
    });

    if(existeUsername){
      throw new BadRequestException(`El username ${username} ya esta registrado`)
    }

    // verficar si ya exiten un correo 
    const existeEmail = await this.userRepository.findOne({
      where: {email}  
    });

    if(existeEmail){
      throw new BadRequestException(`El username ${email} ya esta registrado`)
    }

    // encriptar contraseña
    const hashPassword = await bcrypt.hash(rest.password, 12);

    const newUser = this.userRepository.create({
      username,
      email,
      password: hashPassword
      //roles
    });

    this.userRepository.save(newUser);

    const {password, ...resto_datos} = newUser;
    
    return resto_datos

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`El user con Id ${id} no se encuentra de la BD`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`El user con email ${email} no se encuentra de la BD`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
