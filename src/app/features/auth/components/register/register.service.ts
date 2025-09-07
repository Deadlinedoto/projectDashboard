import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterInterface} from './register.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  http = inject(HttpClient)
  baseApiUrl: string = 'http://dzitskiy.ru:5000/';


  getRegister(payload:{ name: string, login: string, password: string}): Observable<RegisterInterface> {

    return this.http.post<RegisterInterface>(`${this.baseApiUrl}Auth/Register`, payload)

  }

}
