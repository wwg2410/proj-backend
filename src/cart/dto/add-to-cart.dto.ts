import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

// AddToCartDto нужен, чтобы клиент передавал productId и количество в корзину.
export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'ID товара' })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 2, description: 'Количество товара' })
  @IsInt()
  @IsPositive()
  quantity: number;
}
