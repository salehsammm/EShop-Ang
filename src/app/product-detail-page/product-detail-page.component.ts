import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail-page',
  imports: [],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit{
  productId: string | null=null;
  product: Product | null=null;

  constructor(private route: ActivatedRoute , private productService: ProductService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProductById(Number(this.productId));
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

}
