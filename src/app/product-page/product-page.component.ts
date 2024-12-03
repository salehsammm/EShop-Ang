import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component'
import { FilterPipe } from '../pipes/filter.pipe'
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShoppingCartComponent, FilterPipe, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  filterText: string = '';
  @ViewChild(ShoppingCartComponent) shoppingCartComponent!: ShoppingCartComponent;

  products: Product[] = [];

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log("1");
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }


  addToCart(productId: number): void {
    this.shoppingCartService.addToCart(productId).subscribe({
      next: (response) => {
        this.shoppingCartComponent.loadShoppingCart(1);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }

}
