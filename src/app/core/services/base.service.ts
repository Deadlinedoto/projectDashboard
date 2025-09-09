import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  http = inject(HttpClient);
  baseApiUrl: string = 'http://dzitskiy.ru:5000/';

  protected getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.baseApiUrl + endpoint);
  }
  protected postData<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.post<T>(this.baseApiUrl + endpoint, body);
  }
  protected putData<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.put<T>(this.baseApiUrl + endpoint, body);
  }
  protected deleteData<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.baseApiUrl + endpoint);
  }
}
