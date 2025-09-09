import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService} from '../../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseService
{
  getAuth(payload: {login: string, password: string}):Observable<AuthInterface> {
    return this.postData<AuthInterface>('Auth/Login', payload);
  }
}
