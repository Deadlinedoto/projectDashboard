import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService} from '../../../../../core/services';
import {AuthApiService} from '../infrastructure';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authApiService = inject(AuthApiService);

  getAuth(payload: {login: string, password: string}): Observable<AuthInterface> {
    return this.authApiService.getAuth(payload);
  }
}
