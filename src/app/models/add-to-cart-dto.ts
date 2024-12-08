export class AddToCartDto {
    userId:string;
    productId:string;

    constructor(userId:string , productId:string) {
        this.productId = productId;
        this.userId = userId;
    }
}
