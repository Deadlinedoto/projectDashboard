import { Routes } from '@angular/router';
import {AllProductsComponent} from './pages/all-products/all-products';
import {CurrentProductComponent} from './pages/current-product';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {canActivateAuth} from './core/guards/auth.guard';

export const routes: Routes = [

      { title: 'Все объявления', path: '', component: AllProductsComponent },
      { path: 'current-product-mini-card/:id', component: CurrentProductComponent },

      {
        path: 'create-product', component: CreateProductComponent, canActivate: [canActivateAuth]
      }


];
