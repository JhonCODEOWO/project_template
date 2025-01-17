import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('disable/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.disableUser(id);
  }

  @Patch('enable/:id')
  enableUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.enableUser(id);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }
}
