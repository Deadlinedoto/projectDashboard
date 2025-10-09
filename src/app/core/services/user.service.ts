import {computed, inject, Injectable, signal} from '@angular/core';
import {UserInterface} from '../interfaces/user-interface';
import {ApiService} from './http/api.service';
import {catchError, of, tap} from 'rxjs';
import {AuthService} from '../../features/auth/components/auth/services';
import {HeaderService} from '../../common/components/header/header.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiService = inject(ApiService)

  private userSignal = signal<UserInterface | null>(null);

  // user: UserInterface | null = null;

  user = computed(() => this.userSignal());
  userName = computed(() => this.userSignal()?.name || 'Пользователь')
  userId = computed(() => this.userSignal()?.id);

  myProductsId = computed<any>(() => {
    const user = this.userSignal()
    return user?.adverts?.map(advert => advert.id.toString() || [])
  })

  isAuthenticated = computed(() => !!this.userSignal())


  loadMe() {
    return this.apiService.getCurrentUser()
      .pipe(
        tap(user => {
          this.setUser(user);
          console.log('Юзер загружен:', user);
          console.log('Мои айдишники:', user.adverts?.map(a => a.id));
        }),
        catchError(error => {
          this.setUser(null)
          return of(null);
        }))
  }

  setUser(user: UserInterface | null) {
    this.userSignal.set(user);
  }

  getUser(user: UserInterface | null) {
    this.userSignal();
  }

}
