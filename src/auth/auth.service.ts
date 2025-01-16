import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

import * as bcryp from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDetails } = createUserDto;

      const user = this.userRepository.create({
        ...userDetails,
        password: bcryp.hashSync(password, 10),
      });

      const userSaved = await this.userRepository.save(user);
      return userSaved;
      //TODO: SI SE DESEA DEJAR LA CREACIÓN DE USUARIOS A LIBERTAD ENTONCES SE DEBE RETORNAR UN JWT PARA LOGEAR AL USUARIO EN CUANTO SE REGISTRA
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user)
      throw new NotFoundException(`The user with id ${id} doesn't exists`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.findOne(id);

      user = {
        ...user,
        ...updateUserDto,
      };

      return this.userRepository.save(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  //Disable one user if is active otterwhise it active it again
  async disableUser(id: string) {
    const user = await this.findOne(id);
    if (!user.active)
      throw new BadRequestException(`The user is actually disabled`);
    return this.manageStateUser(user);
  }

  async enableUser(id: string) {
    const user = await this.findOne(id);
    console.log(user.active);
    if (user.active)
      throw new BadRequestException(`The user is actually enabled`);
    return this.manageStateUser(user);
  }

  //Maneja el estado de un usuario, si está como true lo desactiva e inversa
  async manageStateUser(user: User) {
    try {
      const userPreloaded = await this.userRepository.preload({
        ...user,
        active: user.active ? false : true,
      });

      await this.userRepository.save(userPreloaded);

      return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    //TODO: DEPENDIENDO DEL CONTROLADOR DE BASE DE DATOS QUE USES CONFIGURA LOS MANEJOS DE ERRORES AQUÍ
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(`${error.sqlMessage}`);
    }
    console.log(error);
    throw new InternalServerErrorException(
      `An unexpected error just jump into auth.service.js`,
    );
  }
}
