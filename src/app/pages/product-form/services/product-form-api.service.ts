import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {ProductFormResponse} from '../interfaces/product-form-response';

@Injectable({
  providedIn: 'root'
})
export class ProductFormApiService extends BaseService{

  createProduct(request: any): Observable<ProductFormResponse> {
    return this.postData<ProductFormResponse>('Advert', request)
  }
}
