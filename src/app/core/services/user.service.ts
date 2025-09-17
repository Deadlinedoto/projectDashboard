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
  user = this.userSignal.asReadonly()

  userData = computed(() => {
    const user = this.userSignal();
    if (!user) return null;

    return {
      ...user,
      userName: user.name,
      userId: user.id,
      userRole: user.role,
      userRegisteredTime: user.registeredTime,
      userAdvertList: user.adverts,
    }
  })

  loadMe() {
    return this.apiService.getCurrentUser()
      .pipe(
        tap(user => {
          this.setUser(user);
        }),
        catchError(error => {
          console.error('Ошибка загрузки пользователя', error);
          this.setUser(null)
          return of(null)
        })
      )
  }

  setUser(user: UserInterface | null) {
    this.userSignal.set(user);
  }
  getUser(user: UserInterface | null) {
    this.userSignal();
  }

  getUserName(): string {
    return this.userSignal()?.name || "Пользователь"

  }
}
