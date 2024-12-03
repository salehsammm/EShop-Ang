import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit , OnChanges{
  productId: string | null=null;
  // @input() productId=0;
  product: Product | null=null;
  products: Product[] = [];

  constructor(private route: ActivatedRoute , private productService: ProductService , private shoppingCartService: ShoppingCartService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProductById(Number(this.productId));
    this.loadProducts();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProductById(Number(this.productId));
    this.loadProducts();
  }

  loadProductById(productId: number):void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log(this.product)
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  addToCart(productId: number): void {
    this.shoppingCartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
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
