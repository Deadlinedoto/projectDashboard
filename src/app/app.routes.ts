import { Routes } from '@angular/router';
import {AllProductsComponent} from './pages/all-products/all-products';
import {CurrentProductComponent} from './pages/current-product/current-product.component';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {canActivateAuth} from './core/guards/auth.guard';

export const routes: Routes = [

      { path: '', component: AllProductsComponent },
      { path: 'current-product-mini-card/:id', component: CurrentProductComponent },

      {
        path: 'create-product', component: CreateProductComponent, canActivate: [canActivateAuth]
      }


];
