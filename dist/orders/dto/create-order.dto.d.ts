export declare class OrderItemDto {
    phoneId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    customerName: string;
    customerEmail: string;
    address: string;
    items: OrderItemDto[];
}
