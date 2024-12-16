import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe'
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { Router, RouterLink } from '@angular/router';
import { PricePipe } from '../pipes/price.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCartSnackbarComponent } from '../components/add-cart-snackbar/add-cart-snackbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogNotLoginComponent } from '../components/dialog-not-login/dialog-not-login.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, RouterLink, PricePipe, MatCardModule, MatSnackBarModule, 
    MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  filterText: string = '';
  userId: string | null = null;
  products: Product[] = [];

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar, private router: Router, readonly dialog: MatDialog) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userId = localStorage.getItem('userId');
    this.loadProducts();
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


  addToCart(productId: string): void {
    if (this.userId) {
      this.shoppingCartService.addToCart(productId).subscribe({
        next: () => {
          this.shoppingCartService.notifyCartUpdate();
          this.snackBar.openFromComponent(AddCartSnackbarComponent, {
            data: '123', duration: 3000,
            horizontalPosition: 'start', verticalPosition: 'bottom',
          });
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });
    }
    else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNotLoginComponent, {
      width: '30%',
      height: '30%',     
      maxWidth: '400px', 
      autoFocus: false
    });
  }

}
