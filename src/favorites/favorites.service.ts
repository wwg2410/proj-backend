import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// FavoritesService управляет списком избранных товаров пользователя.
@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addFavorite(userId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    const existing = await this.prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.favorite.create({
      data: { userId, productId },
      include: { product: true },
    });
  }

  async removeFavorite(userId: number, productId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!favorite) {
      throw new NotFoundException('Товар не найден в избранном');
    }

    return this.prisma.favorite.delete({ where: { id: favorite.id } });
  }
}
