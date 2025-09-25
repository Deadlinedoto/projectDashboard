import { Routes } from '@angular/router';
import {AllProductsComponent} from './pages/all-products/all-products';
import {CurrentProductComponent} from './pages/current-product';
import {CreateProductComponent} from './pages/product-form/create-product.component';
import {canActivateAuth} from './core/guards/auth.guard';
import {productTitleResolver} from './core/resolvers/product.resolver';

export const routes: Routes = [

      {
        title: 'Все объявления',
        path: '',
        loadComponent: () =>
          import('../app/pages/all-products/all-products').then(
            (m) => m.AllProductsComponent
          )
      },
      {
        title: productTitleResolver,
        path: 'current-product-mini-card/:id',
        loadComponent: () =>
          import('../app/pages/current-product').then(
            (m) => m.CurrentProductComponent
          )
      },
      {
        title: 'Новое объявление',
        path: 'product-form',
        loadComponent: () =>
          import('./pages/product-form/create-product.component').then(
            (m) => m.CreateProductComponent
          ),
        canActivate: [canActivateAuth]
      },
      {
        title: 'Настройки',
        path: 'user-settings',
        loadComponent: () =>
          import('../app/pages/user-settings/user-settings.component').then(
            (m) => m.UserSettingsComponent
          )
      }


];
