import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import { ShoppingCartService } from './services/shopping-cart.service';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, RouterModule, MatIconModule, MatBadgeModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;
  cartItemCount: number = 0;

  constructor(private router: Router, private authenticationService: AuthenticationService, 
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.authenticationService.userStatus$.subscribe(() =>{
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.shoppingCartService.cartCount$.subscribe(count => {
          this.cartItemCount = count;
        });
        this.shoppingCartService.getShoppingCartCount().subscribe();
      }
      this.userName = localStorage.getItem('userName');
    })
    

  }

  logOut(): void {
    this.authenticationService.logout();
    alert('از حساب خود خارج شدید');
    this.router.navigate(['']);
  }

  getCartItemCount(): void{
    this.shoppingCartService.getShoppingCartCount().subscribe({
      next : (count) => {
        this.cartItemCount = count;
      },
      error: (err) => {
        console.error(err);
      }
    })


// his.shoppingCartService.addToCart(productId).subscribe({
//         next: () => {
//           this.shoppingCartService.notifyCartUpdate();
//           this.snackBar.openFromComponent(AddCartSnackbarComponent, {
//             data: '123', duration: 3000,
//             horizontalPosition: 'start', verticalPosition: 'bottom',
//           });
//         },
//         error: (error) => {
//           console.error('Error adding product to cart:', error);
//         }
//       });

  }

  title = 'EShop-ang';
}
