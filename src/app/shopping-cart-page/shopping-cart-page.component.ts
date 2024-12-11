import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { PricePipe } from '../pipes/price.pipe';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-shopping-cart-page',
  imports: [PricePipe,MatTableModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css'
})
export class ShoppingCartPageComponent implements OnInit{
  displayedColumns: string[] = ['productName', 'count', 'price'];
  shoppingCart: ShoppingCart | null = null;
  cartStatus:number=0;
  userId: string | null = null;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadShoppingCart();
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
