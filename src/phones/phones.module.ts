import { Module } from '@nestjs/common';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';

// Здесь мы регистрируем модуль телефонов.
// В NestJS каждый модуль отвечает за свою часть приложения.
@Module({
  controllers: [PhonesController],
  providers: [PhonesService],
  exports: [PhonesService],
})
export class PhonesModule {}
