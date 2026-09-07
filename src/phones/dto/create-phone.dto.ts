import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

// DTO (Data Transfer Object) описывает данные, которые клиент отправляет нам.
// С его помощью NestJS автоматически валидирует входящий JSON.
export class CreatePhoneDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Название телефона' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Apple', description: 'Бренд телефона' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 999, description: 'Цена в долларах' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 12, description: 'Количество на складе' })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    example: 'Новый флагманский смартфон',
    description: 'Описание товара',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 256, description: 'Объем памяти в ГБ' })
  @IsInt()
  @IsPositive()
  memoryGb: number;

  @ApiProperty({ example: 'Black Titanium', description: 'Цвет телефона' })
  @IsString()
  @IsNotEmpty()
  color: string;
}
