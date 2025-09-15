import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../shared/components/ui/button';
import {AuthComponent} from '../../../features/auth/components/auth/auth.component';
import {RegisterComponent} from '../../../features/auth/components/register/register.component';
import {AuthService} from '../../../features/auth/components/auth/services';
import {SplitButton} from 'primeng/splitbutton';
import {Toast} from 'primeng/toast';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
    AuthComponent,
    RegisterComponent,
    SplitButton,
    Toast
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  public isVisiblePopupLogin: boolean = false;
  public isVisiblePopupRegister: boolean = false;
  private token = inject(AuthService)._token
  authService = inject(AuthService);


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

  protected readonly AuthService = AuthService;
  protected readonly routes = routes;
}
