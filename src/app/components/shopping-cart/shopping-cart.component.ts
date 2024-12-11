import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { PricePipe } from '../../pipes/price.pipe';


@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule,PricePipe,PricePipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  shoppingCart: ShoppingCart | null = null;
  cartStatus:number=0;
  userId: string | null = null;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.loadShoppingCart();
    }
  }

  loadShoppingCart():void {
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
