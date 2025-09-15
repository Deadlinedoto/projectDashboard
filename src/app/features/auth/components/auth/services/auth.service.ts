import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService} from '../../../../../core/services';
import {AuthApiService} from '../infrastructure';
import {AuthResponse} from '../domains/interfaces/auth.response';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authApiService = inject(AuthApiService);
  _token: string | null = null
  cookieService = inject(CookieService);

  get isAuth() {
    if(!this._token) {
      this._token = this.cookieService.get('token')
    }
    return !!this._token
  }

  login(payload: AuthInterface): Observable<string> {
    return this.authApiService.getAuth(payload)
      .pipe(
      tap((response: string) => {
        this._token = response;
        this.cookieService.set('token', this._token);
        console.log('ТОКЕН:', this._token)
      })
      )
  }

}
