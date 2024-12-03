import { Product } from "./product";

export interface ShoppingCartItem {
    shoppingCartItemId: number;
    count: number;
    productId: number;
    productName: string;
    productPrice: number;
}
