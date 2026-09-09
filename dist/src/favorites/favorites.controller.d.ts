import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(user: {
        id: number;
    }): Promise<({
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
    addFavorite(user: {
        id: number;
    }, productId: number): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        userId: number;
    }>;
    removeFavorite(user: {
        id: number;
    }, productId: number): Promise<{
        id: number;
        createdAt: Date;
        productId: number;
        userId: number;
    }>;
}
