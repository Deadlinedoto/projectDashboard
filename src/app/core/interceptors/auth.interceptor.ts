import { HttpInterceptorFn } from '@angular/common/http';

import {inject} from '@angular/core';
import {AuthService} from '../../features/auth/components/auth/services';
import {CookieService} from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('dadata.ru')) {
    return next(req);
  }

  const cookieService = inject(CookieService);
  const token = cookieService.get('token');

  if(!token) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
    })

  return next(req);
};
