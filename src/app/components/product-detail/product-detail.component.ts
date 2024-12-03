import { Component, input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private productService : ProductService) {}
  product: Product | null=null;
  // @input() productId=0;


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

}
