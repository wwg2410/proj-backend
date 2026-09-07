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
exports.PhonesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PhonesService = class PhonesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const phone = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!phone) {
            throw new common_1.NotFoundException(`Телефон с ID ${id} не найден`);
        }
        return phone;
    }
    async create(createPhoneDto) {
        return this.prisma.product.create({
            data: {
                ...createPhoneDto,
            },
        });
    }
    async update(id, updatePhoneDto) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: {
                ...updatePhoneDto,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({
            where: { id },
        });
    }
    async validateStock(phoneId, quantity) {
        const phone = await this.findOne(phoneId);
        if (quantity > phone.stock) {
            throw new common_1.BadRequestException(`Недостаточно товара '${phone.name}' на складе. Доступно: ${phone.stock}`);
        }
        return phone;
    }
};
exports.PhonesService = PhonesService;
exports.PhonesService = PhonesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhonesService);
//# sourceMappingURL=phones.service.js.map