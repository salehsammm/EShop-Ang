import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable for async operations
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/product';
  // private apiUrl = 'https://localhost:44370/api/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  getProductBySlug(productSlug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/slug/${productSlug}`);
  }
  
}
