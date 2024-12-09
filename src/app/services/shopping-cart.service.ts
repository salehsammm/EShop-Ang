import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable for async operations
import { ProductService } from './product.service'; // Import the ProductService
import { ShoppingCart } from '../models/shopping-cart';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'api/shoppingcart';
  // private apiUrl = 'https://localhost:44370/api/shoppingcart';

  constructor(private http: HttpClient) { }

  addToCart(productId: string) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/add/${productId}`;
    return this.http.post<void>(url ,{} ,{ headers });
  }

  getShoppingCart(): Observable<CartResponse> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}`;
    return this.http.get<CartResponse>(url , {headers});
  }

  RemoveFromCart(shoppingCartItemId: string) {
    const url = `${this.apiUrl}/${shoppingCartItemId}`;
    return this.http.delete<void>(url);
  }

}
