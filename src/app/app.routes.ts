import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import {  HomePageComponent } from './home-page/home-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { authGuard } from './guards/auth.guard';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';

export const routes: Routes = [
    { 
        path: 'products',
        title: 'Product List',
        component: ProductPageComponent
     },
     { 
        path: '',
        title: 'Home Page ',
        component:  HomePageComponent
     },
     {
      path: 'productDetail',
      title: 'ProductDetail',
      component: ProductDetailPageComponent
     },
     {
      path: 'authentication',
      title: 'Authentication',
      component: AuthPageComponent
     },
     {
      path: 'profile',
      title: 'profile',
      component: ProfilePageComponent,
      canActivate: [authGuard]
     },
     {
      path: 'cart',
      title: 'cart',
      component: ShoppingCartPageComponent,
      canActivate: [authGuard]
     },
     
];
