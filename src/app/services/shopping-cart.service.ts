import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import HttpClient
import { BehaviorSubject, Observable } from 'rxjs';  // Import Observable for async operations
import { ProductService } from './product.service'; // Import the ProductService
import { ShoppingCart } from '../models/shopping-cart';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl = 'api/shoppingcart';
  private cartUpdate = new BehaviorSubject<ShoppingCart | null>(null);
  public cartUpdate$ = this.cartUpdate.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(productId: string): Observable<void> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/add/${productId}`;
    return this.http.post<void>(url, {}, { headers });
  }

  getShoppingCart(): Observable<CartResponse> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}`;
    return this.http.get<CartResponse>(url, { headers });
  }

  RemoveFromCart(shoppingCartItemId: string): Observable<void> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${shoppingCartItemId}`;
    return this.http.delete<void>(url,{ headers });
  }

  notifyCartUpdate(): void {
    this.getShoppingCart().subscribe({
      next: (cart) => {
        // console.log("notify");
        this.cartUpdate.next(cart.shoppingCartDto);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getCartUpdateListener(): Observable<ShoppingCart | null> {
    // console.log('listener form service');
    return this.cartUpdate.asObservable();
  }

}
