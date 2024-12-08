import { Product } from "./product";

export interface ShoppingCartItem {
    shoppingCartItemId: string;
    count: number;
    productId: string;
    productName: string;
    productPrice: number;
}
