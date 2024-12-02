import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';


@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  shoppingCart: ShoppingCart | null = null;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadShoppingCart(1);////////////////////////////////////////////////////////////////////////change after userId
  }

  loadShoppingCart(userId: number):void {
    this.shoppingCartService.getShoppingCart(userId).subscribe({
      next: (cart) => {
        this.shoppingCart = cart;
        // console.log(this.shoppingCart);
      },
      error: (err) => {
        console.error('Error fetching shoppingCart:', err);
      }
    });
  }
  
  removeFromCart(shoppingCartItemId: number): void {
    this.shoppingCartService.RemoveFromCart(shoppingCartItemId).subscribe({
      next: () => {
        // console.log('Item removed successfully');
        this.loadShoppingCart(1);//////////////////////////////////////////////UserID
      },
      error: (err) => console.error('Error removing item:', err),
    });
  }

}
