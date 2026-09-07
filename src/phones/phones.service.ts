import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

// Этот сервис работает уже через Prisma и PostgreSQL.
// В памяти массив больше не используется, потому что данные теперь хранятся в БД.
@Injectable()
export class PhonesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const phone = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!phone) {
      throw new NotFoundException(`Телефон с ID ${id} не найден`);
    }

    return phone;
  }

  async create(createPhoneDto: CreatePhoneDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...createPhoneDto,
      },
    });
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto): Promise<Product> {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updatePhoneDto,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async validateStock(phoneId: number, quantity: number): Promise<Product> {
    const phone = await this.findOne(phoneId);

    if (quantity > phone.stock) {
      throw new BadRequestException(
        `Недостаточно товара '${phone.name}' на складе. Доступно: ${phone.stock}`,
      );
    }

    return phone;
  }
}
