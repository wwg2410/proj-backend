import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// SignUpDto описывает данные регистрации нового пользователя.
export class SignUpDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123456', description: 'Пароль минимум 6 символов' })
  @IsString()
  @MinLength(6)
  password: string;
}
