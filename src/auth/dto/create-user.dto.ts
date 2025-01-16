import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(10)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(15)
  password: string;
}
