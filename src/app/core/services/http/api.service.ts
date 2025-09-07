import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductMiniCardInterface} from '../../../pages/all-products/components/product-mini-card/product-mini-card.interface';
import {Observable} from 'rxjs';
import {CurrentProductInterface} from '../../../pages/current-product/current-product-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  baseApiUrl: string = 'http://dzitskiy.ru:5000/';


  getAllProducts(): Observable<ProductMiniCardInterface[]> {
    return this.http.post<ProductMiniCardInterface[]>(`${this.baseApiUrl}Advert/search`, {});
  }
  getSelectedProduct(id: string): Observable<CurrentProductInterface> {
    return this.http.get<CurrentProductInterface>(`${this.baseApiUrl}Advert/` + id);
  }
}
