import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterInterface} from './register.interface';
import {Observable} from 'rxjs';
import {BaseService} from '../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService{

  // getRegister(payload:{ name: string, login: string, password: string}): Observable<RegisterInterface> {
  //   return this.http.post<RegisterInterface>(`${this.baseApiUrl}Auth/Register`, payload)
  // }
    getRegister(payload: RegisterInterface) {
        return this.postData('Auth/Register', payload)
    }

}
