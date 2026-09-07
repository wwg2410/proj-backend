import { PrismaService } from '../prisma/prisma.service';
export declare class FavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFavorites(userId: number): Promise<({
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
        productId: number;
        userId: number;
    })[]>;
    addFavorite(userId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        userId: number;
    }>;
    removeFavorite(userId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        userId: number;
    }>;
}
