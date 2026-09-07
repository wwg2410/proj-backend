import { Order, OrderItem, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PhonesService } from '../phones/phones.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    private readonly phonesService;
    constructor(prisma: PrismaService, phonesService: PhonesService);
    findAll(): Promise<(Order & {
        items: (OrderItem & {
            product: Product;
        })[];
    })[]>;
    create(createOrderDto: CreateOrderDto, userId?: number | null): Promise<{
        items: ({
            product: {
                description: string;
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                brand: string;
                price: number;
                stock: number;
                memoryGb: number;
                color: string;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            price: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number | null;
        customerName: string;
        customerEmail: string;
        address: string;
        total: number;
    }>;
}
