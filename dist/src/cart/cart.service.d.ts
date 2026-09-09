import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<{
        id: number;
        productId: number;
        quantity: number;
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
        subtotal: number;
    }[]>;
    addToCart(userId: number, dto: AddToCartDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    updateCartItem(userId: number, productId: number, quantity: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    removeFromCart(userId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
}
