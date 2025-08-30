import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllProductsInterface} from '../../../features/products/services/all-products.interface';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  baseApiUrl: string = 'http://dzitskiy.ru:5000/';


  getAllProducts(): Observable<AllProductsInterface[]> {
    return this.http.post<AllProductsInterface[]>(`${this.baseApiUrl}Advert/search`, {});
  }
}
