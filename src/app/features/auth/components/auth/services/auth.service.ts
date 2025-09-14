import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService} from '../../../../../core/services';
import {AuthApiService} from '../infrastructure';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authApiService = inject(AuthApiService);

  getAuth(payload: {login: string, password: string}): Observable<AuthInterface> {
    return this.authApiService.getAuth(payload)
      // .pipe(
      //   tap(res => {
      //     if (res.token) {
      //       this.setToken(res.token)
      //     }
      //   })
      // );
  }
  private setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }

}
