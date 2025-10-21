import {Injectable} from '@angular/core';
import {
  ProductMiniCardInterface
} from '../../../pages/all-products/components/product-mini-card/product-mini-card.interface';
import {Observable} from 'rxjs';
import {BaseService} from '../base.service';
import {UserInterface} from '../../interfaces/user-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService{

  getAllProducts(categoryId?: string): Observable<ProductMiniCardInterface[]> {
    const searchParams: any = {
      search: "",
      showNonActive: false
    };
    if (categoryId) {
      searchParams.category = categoryId;
    }
    return this.postData<ProductMiniCardInterface[]>('Advert/search', searchParams)
  }
  getCurrentUser(): Observable<UserInterface> {
    return this.getData<UserInterface>('Users/current')
  }

}
