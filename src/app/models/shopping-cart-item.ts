import { Product } from "./product";

export interface ShoppingCartItem {
    id: number;
    count: number;
    productId: number;
    productName: string;
    productPrice: number;
}
