import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

// CartService управляет корзиной покупателя:
// пользователь добавляет товар, меняет количество или удаляет его.
@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
      subtotal: item.product.price * item.quantity,
    }));
  }

  async addToCart(userId: number, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    if (dto.quantity > product.stock) {
      throw new BadRequestException(
        `Недостаточно товара '${product.name}' на складе. Доступно: ${product.stock}`,
      );
    }

    const existing = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: dto.productId } },
    });

    if (existing) {
      const totalQuantity = existing.quantity + dto.quantity;

      if (totalQuantity > product.stock) {
        throw new BadRequestException(
          `В корзине уже есть ${existing.quantity} единиц. Максимум: ${product.stock}`,
        );
      }

      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: totalQuantity },
        include: { product: true },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      include: { product: true },
    });
  }

  async updateCartItem(userId: number, productId: number, quantity: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
      include: { product: true },
    });

    if (!item) {
      throw new NotFoundException('Товар не найден в корзине');
    }

    if (quantity <= 0) {
      return this.prisma.cartItem.delete({ where: { id: item.id } });
    }

    if (quantity > item.product.stock) {
      throw new BadRequestException(
        `Недостаточно товара '${item.product.name}' на складе. Доступно: ${item.product.stock}`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
      include: { product: true },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!item) {
      throw new NotFoundException('Товар не найден в корзине');
    }

    return this.prisma.cartItem.delete({ where: { id: item.id } });
  }
}
