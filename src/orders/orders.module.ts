import { Module } from '@nestjs/common';
import { PhonesModule } from '../phones/phones.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

// Модуль заказов зависит от модулей телефонов.
// Это важно, потому что при создании заказа мы проверяем наличие товара на складе.
@Module({
  imports: [PhonesModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
