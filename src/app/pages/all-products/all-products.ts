import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductMiniCardComponent} from './components/product-mini-card/product-mini-card.component';
import {ApiService} from '../../core/services/http/api.service';
import {AuthStateService} from '../../features/auth/components/auth/services';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';

@Component({
  selector: 'app-all-products',
  imports: [
    NgForOf,
    RouterLink,
    ProductMiniCardComponent,

  ],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
  standalone: true,
})

export class AllProductsComponent implements OnInit {

  private authStateService = inject(AuthStateService);
  private apiService = inject(ApiService);
  private loadingModalService = inject(LoadingModalService);

  products: any[] = [];

  ngOnInit() {
    this.loadingModalService.showLoadingModal('Загружаем объявления')
    this.authStateService.setPageLoading(true);
    this.apiService.getAllProducts()
      .subscribe({
          next: (value) => {
            console.log(value);
            this.products = value;
            setTimeout(() => {
              this.loadingModalService.hideLoadingModal()
            }, 500)
          },
          error: (error) => {
            console.error('Ошибка загрузки объявлений:', error);
            this.loadingModalService.hideLoadingModal();
          }
        }
      )

  }
}
