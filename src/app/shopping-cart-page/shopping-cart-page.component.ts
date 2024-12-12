import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { PricePipe } from '../pipes/price.pipe';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-page',
  imports: [PricePipe, MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css'
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['productName','productImg', 'count', 'price', 'delete'];
  shoppingCart: ShoppingCart | null = null;
  cartStatus: number = 0;
  userId: string | null = null;
  private cartSubscription: Subscription | null = null;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadShoppingCart();
    this.shoppingCartService.cartUpdate$.subscribe(()=>{
      // console.log('add2');
    })
    this.shoppingCartService.getCartUpdateListener().subscribe(() => {
      // console.log('add');
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadShoppingCart(): void {
    this.shoppingCartService.getShoppingCart().subscribe({
      next: (cart) => {
        this.shoppingCart = cart.shoppingCartDto;
        this.cartStatus = cart.status;
      },
      error: (err) => {
        console.error('Error fetching shoppingCart:', err);
      }
    });
  }

  removeFromCart(shoppingCartItemId: string): void {
    console.log(shoppingCartItemId);
    this.shoppingCartService.RemoveFromCart(shoppingCartItemId).subscribe({
      next: () => {
        this.userId = localStorage.getItem('userId');
        if (this.userId) {
          this.loadShoppingCart();
        }
      },
      error: (err) => console.error('Error removing item:', err),
    });
  }
}
