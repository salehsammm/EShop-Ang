import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AddToCartDto } from '../models/add-to-cart-dto';
import { PricePipe } from '../pipes/price.pipe';
import {MatDivider, MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-product-detail-page',
  imports: [PricePipe,RouterLink, MatDivider],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit , OnChanges{
  productId: string | null = null;
  userId: string | null = null;
  product: Product | null = null;
  products: Product[] = [];
  productSlug: string| null=null;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

    @Input() slug = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.productSlug = this.route.snapshot.paramMap.get('slug');
    if (this.productSlug) {
      this.loadProductBySlug();
    }
    // this.loadProducts();
  }

  ngOnInit(): void {
    this.productSlug = this.route.snapshot.paramMap.get('slug');
    if (this.productSlug) {
      this.loadProductBySlug();
    }
    this.loadProducts();
  }

  loadProductBySlug(): void {
    if (this.productSlug) {
      this.productService.getProductBySlug(this.productSlug).subscribe({
        next: (product) => {
          this.product = product;
          window.scrollTo(0, 0);
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }

  addToCart(productId: string): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.shoppingCartService.addToCart(productId).subscribe({
        next: (response) => {
          //
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
    }
    else {
      alert("userId is empty");
      // console.log("userId is empty");
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

}
