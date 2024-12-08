import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    shoppingCartId: string;
    userId: string;
    isFinal: boolean;
    totalPrice: number;
    shoppingCartItems: ShoppingCartItem[];
}
