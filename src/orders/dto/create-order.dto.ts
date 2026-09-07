import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: 1, description: 'ID телефона из каталога' })
  @IsInt()
  @IsPositive()
  phoneId: number;

  @ApiProperty({ example: 2, description: 'Количество единиц товара' })
  @IsInt()
  @IsPositive()
  quantity: number;
}

// DTO заказа описывает то, что клиент должен отправить при покупке.
export class CreateOrderDto {
  @ApiProperty({ example: 'Иван Петров', description: 'Имя покупателя' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'Email покупателя' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ example: 'ул. Ленина, 12', description: 'Адрес доставки' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: [OrderItemDto],
    description: 'Список товаров в заказе',
    example: [
      { phoneId: 1, quantity: 1 },
      { phoneId: 2, quantity: 2 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
