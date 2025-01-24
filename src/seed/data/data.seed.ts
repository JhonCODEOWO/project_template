import { seed } from '../interfaces/seed.interface';
import * as bcrypt from 'bcrypt';

export const dataToSeed: seed = {
  permissions: [
    {
      name: 'create',
      description: 'Permite la creación de contenido',
    },
    {
      name: 'delete',
      description: 'Permite eliminación de contenido',
    },
    {
      name: 'update',
      description: 'Permite la modificación de contenido',
    },
  ],
  roles: [
    {
      name: 'user',
      description:
        'Puede ingresar y manejar su propio contenido sin posibilidad de modificar datos internos del sistema.',
    },
    {
      name: 'admin',
      description:
        'Puede manipular cualquier elemento del sistema incluyendo control de usuarios.',
    },
  ],
  users: [
    {
      name: 'Administrador',
      lastname: 'Sin apellidos',
      email: 'Prueba@prueba.com',
      password: bcrypt.hashSync('admin', 10),
    },
  ],
};
