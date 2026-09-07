import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// SignInDto используется при логине пользователя.
export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
