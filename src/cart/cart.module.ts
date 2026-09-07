import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

// CartModule содержит всю логику корзины пользователя.
@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
