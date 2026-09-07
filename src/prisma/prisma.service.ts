import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaService оборачивает PrismaClient и обеспечивает корректное подключение/отключение.
// В локальной разработке база может быть выключена, поэтому мы не падаем при старте:
// приложение продолжит работать, пока не будет выполнен запрос к БД.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.warn(
        'Prisma database connection is not available. Start PostgreSQL to use DB-backed endpoints.',
      );
      console.warn(error);
    }
  }

  async onModuleDestroy() {
    // Закрываем соединение при остановке процесса.
    await this.$disconnect();
  }
}
