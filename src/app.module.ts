import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrdersModule } from './orders/orders.module';
import { PhonesModule } from './phones/phones.module';
import { PrismaModule } from './prisma/prisma.module';

// AppModule является корневым модулем приложения.
// Здесь мы подключаем все остальные модули проекта.
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PhonesModule,
    OrdersModule,
    CartModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
