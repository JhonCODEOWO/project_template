import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/entities/users.entity';

//Decorador que devuelve un usuario tomado de una petición, permite obtener un valor individual de un User
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const user = req.user as User;
  if (!user)
    throw new UnauthorizedException(
      `User not found in the request, check if the route uses authenticated decorator before and if its necesary`,
    );

  return !data ? user : user[data];
});
