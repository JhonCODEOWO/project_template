import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(10)
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(15)
  @MinLength(8)
  password: string;
}
