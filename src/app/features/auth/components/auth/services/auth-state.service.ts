import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  authenticated: boolean = false;

  getState(): boolean {
    return this.authenticated
  }

  setState(state: boolean) {
    this.authenticated = state;
  }
}
