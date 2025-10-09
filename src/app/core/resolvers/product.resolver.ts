import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ApiService} from '../services/http/api.service';
import {catchError, map, of} from 'rxjs';
import {CurrentProductApiService} from '../../pages/current-product/services/current-product-api.service';

export const productTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const apiService = inject(ApiService)
  const currentProductApiService = inject(CurrentProductApiService)
  const productId = route.params['id']

  return currentProductApiService.getSelectedProduct(productId).pipe(
    map(product => product?.name || 'Объявление'),
    catchError(() => of('Объявление'))
  )
};
