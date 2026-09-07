"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
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
    async addToCart(userId, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Товар не найден');
        }
        if (dto.quantity > product.stock) {
            throw new common_1.BadRequestException(`Недостаточно товара '${product.name}' на складе. Доступно: ${product.stock}`);
        }
        const existing = await this.prisma.cartItem.findUnique({
            where: { userId_productId: { userId, productId: dto.productId } },
        });
        if (existing) {
            const totalQuantity = existing.quantity + dto.quantity;
            if (totalQuantity > product.stock) {
                throw new common_1.BadRequestException(`В корзине уже есть ${existing.quantity} единиц. Максимум: ${product.stock}`);
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
    async updateCartItem(userId, productId, quantity) {
        const item = await this.prisma.cartItem.findUnique({
            where: { userId_productId: { userId, productId } },
            include: { product: true },
        });
        if (!item) {
            throw new common_1.NotFoundException('Товар не найден в корзине');
        }
        if (quantity <= 0) {
            return this.prisma.cartItem.delete({ where: { id: item.id } });
        }
        if (quantity > item.product.stock) {
            throw new common_1.BadRequestException(`Недостаточно товара '${item.product.name}' на складе. Доступно: ${item.product.stock}`);
        }
        return this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity },
            include: { product: true },
        });
    }
    async removeFromCart(userId, productId) {
        const item = await this.prisma.cartItem.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (!item) {
            throw new common_1.NotFoundException('Товар не найден в корзине');
        }
        return this.prisma.cartItem.delete({ where: { id: item.id } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map