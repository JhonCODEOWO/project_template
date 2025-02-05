import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidRoles } from 'src/common/enums/role.enum';
import { Auth } from './decorators/role-protected/auth.decorator';
import { ValidPermissions } from 'src/common/enums/permission.enum';
import { CheckPermission } from './decorators/permission-protected/check-permission.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Resource created correctly',
  })
  @ApiResponse({
    status: 401,
    description: 'The user dont have access to this route',
  })
  //El usuario debe estar logeado, ser admin y además tener el permiso create
  @CheckPermission(ValidPermissions.create)
  @Auth(ValidRoles.admin)
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'All of the users registered obtained by pages',
    type: User,
    isArray: true,
  })
  findAll(@Query() parameters: PaginationDto) {
    return this.authService.findAll(parameters);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'UUI of the user to get' })
  @ApiResponse({ status: 200, type: User, description: 'The user finded' })
  @ApiResponse({ status: 404, description: 'The user doesnt exists' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'The uuid of the user' })
  @ApiBody({ type: UpdateUserDto })
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('disable/:id')
  @ApiParam({ name: 'id', description: 'The uuid of the user', type: 'number' })
  @ApiResponse({ status: 200, description: 'The user is now inactive' })
  @ApiResponse({ status: 404, description: 'The user dont exists' })
  @ApiResponse({ status: 400, description: 'The user is disabled yet' })
  @CheckPermission(ValidPermissions.delete)
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.disableUser(id);
  }

  @ApiParam({ name: 'id', description: 'The uuid of the user', type: 'number' })
  @ApiResponse({ status: 200, description: 'The user is now active' })
  @ApiResponse({ status: 404, description: 'The user dont exists' })
  @ApiResponse({ status: 400, description: 'The user is enabled yet' })
  @Patch('enable/:id')
  enableUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.enableUser(id);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: 'User with JWT',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'User or password doesnt match with any record',
  })
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }
}
