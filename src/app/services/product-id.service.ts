import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductIdService {

  private productId: string | null = null;

  constructor() { }

  setProductId(productId: string): void {
    this.productId = productId;
  }

  getProductId(): string | null {
    return this.productId;
  }

}
