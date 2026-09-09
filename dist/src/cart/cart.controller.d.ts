import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(user: {
        id: number;
    }): Promise<{
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
    addToCart(user: {
        id: number;
    }, dto: AddToCartDto): Promise<{
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
    updateCartItem(user: {
        id: number;
    }, productId: number, quantity: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    removeFromCart(user: {
        id: number;
    }, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
}
