import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable for async operations
import { ProductService } from './product.service'; // Import the ProductService
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'https://localhost:44370/api/shoppingcart';

  constructor(private http: HttpClient) { }

  addToCart(productId : number) {
    const payload = { productId };
    const url = `${this.apiUrl}/${productId}`;
    return this.http.post<void>(url, payload);
  }

  getShoppingCart(userId: number) {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<ShoppingCart>(url);
  }

  RemoveFromCart(shoppingCartItemId : number) {
    const url = `${this.apiUrl}/${shoppingCartItemId}`;
    return this.http.delete<void>(url);
  }

}
