import {inject, Injectable} from '@angular/core';
import {ProductMiniCardInterface} from '../../../pages/all-products/components/product-mini-card/product-mini-card.interface';
import {Observable} from 'rxjs';
import {CurrentProductInterface} from '../../../pages/current-product';
import {BaseService} from '../base.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService{

  getAllProducts(): Observable<ProductMiniCardInterface[]> {
    return this.postData<ProductMiniCardInterface[]>('Advert/search', {})
  }
  getSelectedProduct(id: string): Observable<CurrentProductInterface> {
    return this.getData<CurrentProductInterface>('Advert/' + id)
  }
}
