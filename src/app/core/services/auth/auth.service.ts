import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthInterface} from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl: string = 'http://dzitskiy.ru:5000/'

  getAuth(payload: {login: string, password: string}):Observable<AuthInterface> {
    return this.http.post<AuthInterface>(`${this.baseApiUrl}Auth/Login`, payload)
  }
}
