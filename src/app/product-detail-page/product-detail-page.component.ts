import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductIdService } from '../services/product-id.service';
import { AddToCartDto } from '../models/add-to-cart-dto';


@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit , OnChanges{
  productId: string | null = null;
  userId: string | null = null;
  product: Product | null = null;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private shoppingCartService: ShoppingCartService, private productIdService: ProductIdService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    // this.loadProductById(Number(this.productId));
    this.loadProducts();
  }

  ngOnInit(): void {
    this.productId = this.productIdService.getProductId();
    if (this.productId) {
      this.loadProductById(this.productId);
    }
    this.loadProducts();
    console.log(this.productId)
  }

  loadProductById(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  addToCart(productId: string): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      const addToCartDto = new AddToCartDto(this.userId, productId);
      this.shoppingCartService.addToCart(addToCartDto).subscribe({
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
