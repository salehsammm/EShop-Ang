import {Component, inject, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cart-snackbar',
  imports: [],
  templateUrl: './add-cart-snackbar.component.html',
  styleUrl: './add-cart-snackbar.component.css'
})
export class AddCartSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string, private router:Router){}


  goToCart(){
    this.router.navigate(['/cart'])
  }
}
