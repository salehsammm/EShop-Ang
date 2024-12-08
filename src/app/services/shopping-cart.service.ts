import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable for async operations
import { ProductService } from './product.service'; // Import the ProductService
import { ShoppingCart } from '../models/shopping-cart';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // private apiUrl = '/api/shoppingcart';
  private apiUrl = 'https://localhost:44370/api/shoppingcart';

  constructor(private http: HttpClient) { }

  addToCart(addToCartDto : AddToCartDto) {
    const payload = { addToCartDto };
    const url = `${this.apiUrl}/add`;
    return this.http.post<void>(url, addToCartDto);
  }

  getShoppingCart(userId: string) : Observable<CartResponse> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<CartResponse>(url);
  }

  RemoveFromCart(shoppingCartItemId : string) {
    const url = `${this.apiUrl}/${shoppingCartItemId}`;
    return this.http.delete<void>(url);
  }

}
