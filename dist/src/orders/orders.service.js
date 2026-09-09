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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const phones_service_1 = require("../phones/phones.service");
let OrdersService = class OrdersService {
    prisma;
    phonesService;
    constructor(prisma, phonesService) {
        this.prisma = prisma;
        this.phonesService = phonesService;
    }
    async findAll() {
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
    async create(createOrderDto, userId) {
        const preparedItems = [];
        for (const item of createOrderDto.items) {
            const phone = await this.phonesService.validateStock(item.phoneId, item.quantity);
            preparedItems.push({
                productId: phone.id,
                quantity: item.quantity,
                price: phone.price,
            });
        }
        const total = preparedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
        for (const item of preparedItems) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.BadRequestException('Один из товаров больше не существует на складе');
            }
            const updatedStock = product.stock - item.quantity;
            if (updatedStock < 0) {
                throw new common_1.BadRequestException(`Невозможно создать заказ: товар '${product.name}' закончился на складе.`);
            }
            await this.prisma.product.update({
                where: { id: item.productId },
                data: { stock: updatedStock },
            });
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        phones_service_1.PhonesService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map