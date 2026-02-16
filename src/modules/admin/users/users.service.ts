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
    return this.userRepository.find();
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const {rolesIds, ...resto} = updateUserDto;

    Object.assign(user, resto);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`El user con ID ${id} no se encuentra de la BD`)
    }
  }
}
