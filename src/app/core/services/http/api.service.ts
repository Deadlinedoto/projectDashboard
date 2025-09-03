import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllProductsInterface} from '../../../features/products/services/all-products.interface';
import {Observable} from 'rxjs';
import {ProductInterface} from '../../../features/products/services/product-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  baseApiUrl: string = 'http://dzitskiy.ru:5000/';


  getAllProducts(): Observable<AllProductsInterface[]> {
    return this.http.post<AllProductsInterface[]>(`${this.baseApiUrl}Advert/search`, {});
  }
  getSelectedProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.baseApiUrl}Advert/` + id);
  }
}
