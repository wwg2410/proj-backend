import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<({
        id: number;
        createdAt: Date;
        userId: number | null;
        customerName: string;
        customerEmail: string;
        address: string;
        total: number;
    } & {
        items: (import(".prisma/client").OrderItem & {
            product: import(".prisma/client").Product;
        })[];
    })[]>;
    create(user: {
        id: number;
    }, createOrderDto: CreateOrderDto): Promise<{
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
