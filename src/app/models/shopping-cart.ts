import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    shoppingCartId: number;
    userId: number;
    isFinal: boolean;
    totalPrice: number;
    shoppingCartItems: ShoppingCartItem[];
}
