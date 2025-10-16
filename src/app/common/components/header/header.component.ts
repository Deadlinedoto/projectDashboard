import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../shared/components/ui/button';
import {AuthComponent} from '../../../features/auth/components/auth/auth.component';
import {RegisterComponent} from '../../../features/auth/components/register/register.component';
import {AuthService} from '../../../features/auth/components/auth/services';
import {SplitButton} from 'primeng/splitbutton';
import {MenuItem} from 'primeng/api';
import {HeaderService} from './header.service';
import {UserService} from '../../../core/services';
import {
  ShowAllCategoriesComponent
} from '../../../shared/components/show-all-categories-modal/show-all-categories.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
    AuthComponent,
    RegisterComponent,
    SplitButton,
    ShowAllCategoriesComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  public isVisiblePopupLogin: boolean = false;
  public isVisiblePopupRegister: boolean = false;

  authService = inject(AuthService);
  headerService = inject(HeaderService)
  userService = inject(UserService)
  items: MenuItem[];


  userName = this.userService.userName

  ngOnInit() {
    if (this.authService.isAuth) {
      this.userService.loadMe()
    }

    else console.log('Не авторизирован');
  }


  constructor() {
    this.items = [
      {
        label: 'Мои объявления',
        command: () => void this.headerService.navigateTo('/my-products'),
      },
      {
        label: 'Настройки',
        command: () => void this.headerService.navigateTo('/user-settings'),
      },
      {
        label: 'Выйти',
        styleClass: 'logout-menu-item',
        command: () =>  {
          this.authService.logout()
          this.userService.setUser(null)
        }
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

}
