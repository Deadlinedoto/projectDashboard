import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AuthInterface} from '../domains/interfaces/auth.interface';
import {BaseService, UserService} from '../../../../../core/services';
import {AuthApiService} from '../infrastructure';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authApiService = inject(AuthApiService);
  userService = inject(UserService);
  cookieService = inject(CookieService);
  router = inject(Router);

  get isAuth() {
    const token = this.cookieService.get('token');
    return !!token;
  }

  login(payload: AuthInterface) {
    return this.authApiService.getAuth(payload)
      .pipe(
        tap((response: string) => {
          this.cookieService.set('token', response);
          this.userService.loadMe().subscribe()
        })
      )
  }
  logout() {
    this.cookieService.delete('token');
    this.userService.setUser(null);
    this.router.navigate(['/']);
  }
}
