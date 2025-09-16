import {Injectable, signal} from '@angular/core';
import {UserInterface} from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSignal = signal<UserInterface | null>(null);
  user = this.userSignal.asReadonly()

  setUser(user: UserInterface | null) {
    this.userSignal.set(user);
  }

  getUserName(): string | null {
    return this.userSignal()?.name || null
  }
}
