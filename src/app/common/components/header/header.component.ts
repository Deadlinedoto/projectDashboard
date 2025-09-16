import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../shared/components/ui/button';
import {AuthComponent} from '../../../features/auth/components/auth/auth.component';
import {RegisterComponent} from '../../../features/auth/components/register/register.component';
import {AuthService} from '../../../features/auth/components/auth/services';
import {SplitButton} from 'primeng/splitbutton';
import {routes} from '../../../app.routes';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {HeaderService} from './header.service';
import {UserService} from '../../../core/services';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
    AuthComponent,
    RegisterComponent,
    SplitButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  public isVisiblePopupLogin: boolean = false;
  public isVisiblePopupRegister: boolean = false;

  authService = inject(AuthService);
  headerService = inject(HeaderService)
  userService = inject(UserService)


  userName = computed(() => this.userService.user()?.name || 'Пользователь')


  items: MenuItem[];


  constructor() {
    this.items = [
      {
        label: 'Мои объявления',
      },
      {
        label: 'Настройки',
        command: () => void this.headerService.navigateTo('/'),
      },
      {
        label: 'Выйти',
        styleClass: 'logout-menu-item',
        command: () => this.authService.logout()
      }
    ]
  }


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
