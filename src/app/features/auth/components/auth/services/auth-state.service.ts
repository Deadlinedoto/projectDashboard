import {computed, Injectable, signal} from '@angular/core';
import {AuthStateInterface} from './auth-state-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private state = signal<AuthStateInterface>({
    isLoading: false
  })


  isLoading = computed(() => this.state().isLoading)

  authenticated: boolean = false;

  getState(): boolean {
    return this.authenticated
  }

  setState(state: boolean) {
    this.authenticated = state;
  }
}
