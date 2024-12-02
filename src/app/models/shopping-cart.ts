import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    id: number;
    userId: number;
    isFinal: boolean;
    totalPrice: number;
    shoppingCartItems: ShoppingCartItem[];
}
