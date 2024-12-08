import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component'
import { FilterPipe } from '../pipes/filter.pipe'
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { RouterLink } from '@angular/router';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { ProductIdService } from '../services/product-id.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShoppingCartComponent, FilterPipe, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  filterText: string = '';
  userId: string | null=null;

  @ViewChild(ShoppingCartComponent) shoppingCartComponent!: ShoppingCartComponent;

  products: Product[] = [];

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService ,
              private produtIdService: ProductIdService) { }

  ngOnInit(): void {
    // this.userId = this.userService.getUserId();
    this.userId = localStorage.getItem('userId');

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        // console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }


  addToCart(productId: string): void {
    // console.log(productId);
    if (this.userId) {
      const addToCartDto = new AddToCartDto(this.userId , productId);
      // console.log(addToCartDto);
      this.shoppingCartService.addToCart(addToCartDto).subscribe({
        next: (response) => {
        this.userId = localStorage.getItem('userId');

          if (this.userId) {
          this.shoppingCartComponent.loadShoppingCart(this.userId);
          }
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
    }
    else{
      alert("userId is empty");
      // console.log("userId is empty");
    }
  }

  goToDetail(productId: string): void{
    this.produtIdService.setProductId(productId);
  }

}
