import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentProductInterface} from '../current-product-interface';
import {BaseService} from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class CurrentProductApiService extends BaseService{

  getSelectedProduct(id: string): Observable<CurrentProductInterface> {
    return this.getData<CurrentProductInterface>('Advert/' + id)
  }
  deleteMyProduct(id: string) {
    return this.deleteData('Advert/' + id)
  }

}
