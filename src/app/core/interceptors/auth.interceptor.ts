import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../features/auth/components/auth/services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService)._token

  if(!token) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
    })

  return next(req);
};
