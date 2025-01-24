import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { dataToSeed } from './data/data.seed';
import {
  seedPermission,
  seedRole,
  seedUser,
} from './interfaces/seed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { Permissions } from 'src/roles/entities/permission.entity';
import { User } from 'src/auth/entities/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly configService: ConfigService,
  ) {}

  async executeSeed() {
    //Obtener el conteo de registros
    const roleCount = await this.roleRepository.count();
    const permissionsCount = await this.permissionRepository.count();
    const userCount = await this.userRepository.count();
    const data = dataToSeed;
    const SEED_ALLOWED =
      this.configService.getOrThrow('SEED_ALLOWED') === 'true';

    //Validar que no se ejecute el seed nuevamente si ya hay datos en alguno de los 3 elementos
    if (
      SEED_ALLOWED == false &&
      (roleCount > 0 || permissionsCount > 0 || userCount > 0)
    )
      throw new ServiceUnavailableException(`Ya se ha ejecutado antes un seed`);

    try {
      //Vaciar todas las tablas que van a recibir un seed
      await this.emptyAll();

      //Añadir datos
      await this.insertRoles(data.roles);

      const permissions = await this.insertPermissions(data.permissions);

      //Asignar los permisos a los roles
      await this.insertPermissionsToRole(permissions, 'admin');

      //Crear los usuarios
      await this.insertUsers(data.users);

      //Asignar roles a usuarios por defecto.
      const userDefault = await this.getUser('jjv20618@gmail.com');

      //Asignar roles al usuario
      userDefault.roles = [await this.getRole('admin')];
      this.userRepository.save(userDefault);

      return 'Hecho';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Ha ocurrido un error al ejecutar todo el seed`,
      );
    }
  }

  async emptyAll() {
    await this.permissionRepository.delete({});
    await this.roleRepository.delete({});
  }

  //Inserta los permisos dados a un role mediante su nombre
  async insertPermissionsToRole(permissions: Permissions[], roleName: string) {
    const role = await this.getRole(roleName);

    //Asignar los permisos
    role.permisssions = permissions;

    //Actualizar en la base de datos
    this.roleRepository.save(role);
  }

  //Obtener un rol en base a su nombre
  async getRole(roleName: string) {
    //Obtener el role
    const role = await this.roleRepository.findOneBy({ name: roleName });

    //Si no se obtiene un role...
    if (!role) throw new NotFoundException(`El rol ${roleName} no existe`);

    return role;
  }

  async getUser(email: string) {
    //Obtener el role
    const user = await this.userRepository.findOneBy({ email: email });

    //Si no se obtiene un role...
    if (!user)
      throw new NotFoundException(`El usuario con el email ${email} no existe`);

    return user;
  }

  async insertPermissions(permission: seedPermission[]) {
    try {
      const promises = [];
      permission.forEach((permission) => {
        promises.push(
          this.permissionRepository.save(
            this.permissionRepository.create({ ...permission }),
          ),
        );
      });

      await Promise.all(promises);
      const permissions = await this.permissionRepository.find();
      return permissions;
    } catch (error) {
      console.log(error);
    }
  }

  async insertRoles(roles: seedRole[]) {
    try {
      const promises = [];
      roles.forEach((role) => {
        promises.push(
          this.roleRepository.save(this.roleRepository.create({ ...role })),
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
  }

  async insertUsers(users: seedUser[]) {
    try {
      const promises = [];
      users.forEach((user) => {
        promises.push(
          this.userRepository.save(this.userRepository.create({ ...user })),
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.log(`Ha ocurrido un error en insertUsers ${error}`);
    }
  }
}
