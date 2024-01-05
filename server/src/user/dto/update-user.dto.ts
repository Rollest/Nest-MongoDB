import { IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'Password should contain more than 5 symbols.' })
  password: string;
}
