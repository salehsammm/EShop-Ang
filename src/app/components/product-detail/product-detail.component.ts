import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnChanges{
  product: Product | null=null;
  @Input() productId:number | null=null;


  constructor(private productService : ProductService , private shoppingCartService : ShoppingCartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.productId != null) {
    this.loadProductById(this.productId)
    }
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

}
