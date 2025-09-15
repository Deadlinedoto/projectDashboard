import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService} from '../../../../../core/services';
import {AuthResponse} from '../domains/interfaces/auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseService
{
  getAuth(payload: AuthInterface):Observable<string> {
    return this.postData<string>('Auth/Login', payload);
  }
}
