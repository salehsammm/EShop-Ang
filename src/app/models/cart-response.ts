import { ShoppingCart } from "./shopping-cart";

export class CartResponse {
    status:number = 0;
    shoppingCartDto:ShoppingCart | null=null;
}
