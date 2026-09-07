import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// PrismaModule создаёт один shared экземпляр PrismaClient для всего приложения.
// Это нужно, чтобы не создавать отдельный клиент в каждом сервисе.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
