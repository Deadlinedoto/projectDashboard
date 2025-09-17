import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ApiService} from '../services/http/api.service';
import {catchError, map, of} from 'rxjs';

export const productTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const apiService = inject(ApiService)
  const productId = route.params['id']

  return apiService.getSelectedProduct(productId).pipe(
    map(product => product?.name || 'Объявление'),
    catchError(() => of('Объявление'))
  )
};
