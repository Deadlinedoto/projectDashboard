import {inject, Injectable} from '@angular/core';
import {ProductMiniCardInterface} from '../../../pages/all-products/components/product-mini-card/product-mini-card.interface';
import {Observable} from 'rxjs';
import {CurrentProductInterface} from '../../../pages/current-product';
import {BaseService} from '../base.service';
import {UserInterface} from '../../interfaces/user-interface';
import {RegisterInterface} from '../../../features/auth/components/register/register.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService{

  getAllProducts(): Observable<ProductMiniCardInterface[]> {
    return this.postData<ProductMiniCardInterface[]>('Advert/search', {})
  }
  getCurrentUser(): Observable<UserInterface> {
    return this.getData<UserInterface>('Users/current')
  }

}
