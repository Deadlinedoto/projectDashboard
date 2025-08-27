import { Routes } from '@angular/router';
import {MainLayoutComponent} from './shared/components/layout/main-layout/main-layout.component';
import {AllProductsComponent} from './pages/all-products/all-products';
import {CurrentProductComponent} from './pages/current-product/current-product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: AllProductsComponent},
      {path: 'current-product', component: CurrentProductComponent}
    ]
  }
];
