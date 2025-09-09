import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../shared/components/ui/button';
import {AuthComponent} from '../../../features/auth/components/auth/auth.component';
import {RegisterComponent} from '../../../features/auth/components/register/register.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
    AuthComponent,
    RegisterComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  public isVisiblePopupLogin: boolean = false;
  public isVisiblePopupRegister: boolean = false;

  showVisiblePopupLogin() {
    this.isVisiblePopupLogin = !this.isVisiblePopupLogin;
  }
  closePopupLogin(value: boolean) {
    this.isVisiblePopupLogin = value;
  }
  showVisiblePopupRegister() {
    this.isVisiblePopupRegister = !this.isVisiblePopupRegister;
  }
  closePopupRegister(value: boolean) {
    this.isVisiblePopupRegister = value;
  }
}
