import { Routes } from '@angular/router';
import {AllProductsComponent} from './pages/all-products/all-products';
import {CurrentProductComponent} from './pages/current-product/current-product.component';

export const routes: Routes = [

      {
        path: '',
        component: AllProductsComponent
      },
      {
        path: 'current-product-mini-card/:id',
        component: CurrentProductComponent
      },


];
