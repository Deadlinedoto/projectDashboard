import {computed, Injectable, signal} from '@angular/core';
import {AuthStateInterface} from '../domains/interfaces/auth-state-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private state = signal<AuthStateInterface>({
    isLoading: false,
    isPageLoading: true,
  })


  isLoading = computed(() => this.state().isLoading)
  isPageLoading = computed(() => this.state().isPageLoading)

  authenticated: boolean = false;

  setPageLoading = (loading: boolean) => {
    this.state.update(current => ({
      ...current,
      isPageLoading: loading
    }))
  }
  setLoading(loading: boolean) {
    this.state.update(current => ({
      ...current,
      isLoading: loading
    }))
  }

  getState(): boolean {
    return this.authenticated
  }

  setState(state: boolean) {
    this.authenticated = state;
  }

}
