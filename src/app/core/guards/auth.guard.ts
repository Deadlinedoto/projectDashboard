import {inject} from '@angular/core';
import {AuthService} from '../../features/auth/components/auth/services';
import {Router} from '@angular/router';

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth
  const router = inject(Router);

  if(isLoggedIn) {
    return true
  }


  return router.createUrlTree([router.url]);
}
