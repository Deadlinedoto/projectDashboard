import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../shared/components/ui/button';
import {AuthComponent} from '../../../features/auth/components/auth/auth.component';
import {RegisterComponent} from '../../../features/auth/components/register/register.component';
import {AuthService} from '../../../features/auth/components/auth/services';
import {SplitButton} from 'primeng/splitbutton';
import {MenuItem} from 'primeng/api';
import {HeaderService} from './services/header.service';
import {UserService} from '../../../core/services';
import {
  ShowAllCategoriesComponent
} from '../../../shared/components/show-all-categories-modal/show-all-categories.component';
import {Popover} from 'primeng/popover';
import {SearchService} from './services/search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ButtonComponent,
    AuthComponent,
    RegisterComponent,
    SplitButton,
    ShowAllCategoriesComponent,
    Popover,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  public isVisiblePopupLogin: boolean = false;
  public isVisiblePopupRegister: boolean = false;
  public searchQuery: string = '';

  private searchService = inject(SearchService);
  authService = inject(AuthService);
  headerService = inject(HeaderService)
  userService = inject(UserService)
  items: MenuItem[];


  @ViewChild('showAllCategoryMenu') categoryMenu!: ShowAllCategoriesComponent;

  menuButtonIcon = 'list-nested';
  menuButtonActive = false;

  onMenuShow() {
    this.menuButtonActive = true;
    this.menuButtonIcon = 'close';
  }

  onMenuHide() {
    this.menuButtonActive = false;
    this.menuButtonIcon = 'list-nested';
  }

  userName = this.userService.userName

  ngOnInit() {
    if (this.authService.isAuth) {
      this.userService.loadMe()
    }
    else console.log('Не авторизирован');
    this.searchQuery = this.searchService.getSearchQuery();
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

  onSearchInput(event: any): void {
    const value = event.target.value;
    this.searchQuery = value;
    this.searchService.setSearchQuery(value.trim());
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.searchService.clearSearchQuery();
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
