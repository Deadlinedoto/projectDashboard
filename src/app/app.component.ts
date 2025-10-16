import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './common/components/header/header.component';
import {FooterComponent} from './common/components/footer/footer.component';
import {AuthService} from './features/auth/components/auth/services';
import {UserService} from './core/services';
import {SkeletonBigComponent} from './features/skeletons/skeleton-big/skeleton-big.component';
import {CategoriesService} from './features/categories/services/categories.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SkeletonBigComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'projectDashboard';
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private categoriesService = inject(CategoriesService)
  isLoading = true


  ngOnInit() {
    this.initializeUser()
    this.categoriesService.getCategories()
  }


  private initializeUser() {
    if (this.authService.isAuth) {
      this.userService.loadMe().subscribe({
        next: ()=> this.isLoading = false,
        error: ()=> this.isLoading = false
      })
    }
    else this.isLoading = false;
  }


}
