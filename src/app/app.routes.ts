import { Routes } from '@angular/router';
import {MainLayoutComponent} from './shared/components/layout/main-layout/main-layout.component';
import {AllAds} from './pages/all-ads/all-ads';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: AllAds}
    ]
  }
];
