import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  http = inject(HttpClient);

  protected getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + endpoint);
  }
  protected postData<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }
  protected putData<T>(endpoint: string, body?: any): Observable<T> {
    return this.http.put<T>(environment.apiUrl + endpoint, body);
  }
  protected deleteData<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + endpoint);
  }
}
