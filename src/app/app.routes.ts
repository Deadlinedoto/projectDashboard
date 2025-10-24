import {Routes} from '@angular/router';
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
    path: 'current-product/:id',
    loadComponent: () =>
      import('../app/pages/current-product').then(
        (m) => m.CurrentProductComponent
      ),
    data: {
      isMyProduct: false,
      showEditButton: false
    }
  },
  {
    title: 'Новое объявление',
    path: 'product-form',
    loadComponent: () =>
      import('./pages/product-form/product-form-component').then(
        (m) => m.ProductFormComponent
      ),
    canActivate: [canActivateAuth]
  },
  {
    title: 'Редактирование объявления',
    path: 'product-form/:id',
    loadComponent: () =>
      import('./pages/product-form/product-form-component').then(
        (m) => m.ProductFormComponent
      ),
    canActivate: [canActivateAuth]
  },
  {
    title: 'Настройки',
    path: 'user-settings',
    loadComponent: () =>
      import('../app/pages/user-settings/user-settings.component').then(
        (m) => m.UserSettingsComponent
      ),
    canActivate: [canActivateAuth],
  },
  {
    title: 'Мои объявления',
    path: 'my-products',
    loadComponent: () =>
      import('../app/pages/my-products/my-products.component').then(
        (m) => m.MyProductsComponent
      ),
    canActivate: [canActivateAuth]
  },
  {
    title: productTitleResolver,
    path: 'my-products/current-product/:id',
    loadComponent: () =>
      import('../app/pages/current-product').then(
        (m) => m.CurrentProductComponent
      ),
    data: {
      isMyProduct: true,
      showEditButton: true
    }
  },
  {
    title: 'Страница не найдена',
    path: '**',
    loadComponent: () =>
      import('../app/pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      )
  }


];
