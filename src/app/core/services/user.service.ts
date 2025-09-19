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
  user: UserInterface | null = null;

  userName = computed(() => this.userSignal()?.name || 'Пользователь')


  loadMe() {
    return this.apiService.getCurrentUser()
      .subscribe(
        user => {
          this.setUser(user)
          this.user = user;
        });
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
