import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderItem, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PhonesService } from '../phones/phones.service';
import { CreateOrderDto } from './dto/create-order.dto';

// OrdersService теперь сохраняет заказы в PostgreSQL через Prisma.
// Сначала мы проверяем наличие товара, а потом обновляем остаток на складе.
@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly phonesService: PhonesService,
  ) {}

  async findAll(): Promise<
    (Order & { items: (OrderItem & { product: Product })[] })[]
  > {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createOrderDto: CreateOrderDto, userId?: number | null) {
    const preparedItems: Array<{
      productId: number;
      quantity: number;
      price: number;
    }> = [];

    for (const item of createOrderDto.items) {
      const phone = await this.phonesService.validateStock(
        item.phoneId,
        item.quantity,
      );

      preparedItems.push({
        productId: phone.id,
        quantity: item.quantity,
        price: phone.price,
      });
    }

    const total = preparedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        customerName: createOrderDto.customerName,
        customerEmail: createOrderDto.customerEmail,
        address: createOrderDto.address,
        total,
        items: {
          create: preparedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // После создания заказа уменьшаем остаток товара на складе.
    for (const item of preparedItems) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new BadRequestException(
          'Один из товаров больше не существует на складе',
        );
      }

      const updatedStock = product.stock - item.quantity;

      if (updatedStock < 0) {
        throw new BadRequestException(
          `Невозможно создать заказ: товар '${product.name}' закончился на складе.`,
        );
      }

      await this.prisma.product.update({
        where: { id: item.productId },
        data: { stock: updatedStock },
      });
    }

    return order;
  }
}
