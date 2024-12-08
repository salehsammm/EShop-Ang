export class RemoveFromCartDto {
    userId:string;
    itemId:string;

    constructor(userId:string , itemId:string) {
        this.itemId = itemId;
        this.userId = userId;
    }
}
