import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import {  HomePageComponent } from './home-page/home-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

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
      path: 'productDetail/:id',
      title: 'ProductDetail',
      component: ProductDetailPageComponent
     },
     {
      path: 'authentication',
      title: 'Authentication',
      component: AuthPageComponent
     },
     
];
