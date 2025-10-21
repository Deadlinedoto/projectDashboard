import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductMiniCardComponent} from './components/product-mini-card/product-mini-card.component';
import {ApiService} from '../../core/services/http/api.service';
import {AuthStateService} from '../../features/auth/components/auth/services';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';
import {SearchService} from '../../common/components/header/services/search.service';
import {Subscription} from 'rxjs';
import {LoadingModalComponent} from '../../features/loading-modal/loading-modal/loading-modal.component';
import {ButtonComponent} from '../../shared/components/ui/button';

@Component({
  selector: 'app-all-products',
  imports: [
    NgForOf,
    RouterLink,
    ProductMiniCardComponent,
    LoadingModalComponent,
    ButtonComponent,

  ],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
  standalone: true,
})

export class AllProductsComponent implements OnInit, OnDestroy {

  private authStateService = inject(AuthStateService);
  private apiService = inject(ApiService);
  private loadingModalService = inject(LoadingModalService);
  public searchService = inject(SearchService);


  products = signal<any[]>([]);

  filteredProducts = computed(() => {
    const searchQuery = this.searchService.searchQuery();
    const productsArray = this.products();
    if (searchQuery && searchQuery.trim() !== '') {
      return this.searchService.filterProducts(productsArray, searchQuery);
    }
    return productsArray;
  });

  private searchSubscription?: Subscription;

  ngOnInit() {
    this.loadProducts();

    this.searchService.selectedCategory$.subscribe(category => {
      this.loadProducts(category?.id);
    });

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
    });
  }



  loadProducts(categoryId?: string) {
    this.loadingModalService.showLoadingModal('Загружаем объявления')
    this.authStateService.setPageLoading(true);

    const selectedCategory = this.searchService.getSelectedCategory();
    const finalCategoryId = categoryId || selectedCategory?.id;

    this.apiService.getAllProducts(finalCategoryId)
      .subscribe({
          next: (value) => {
            console.log(value);
            console.log('2 раза');
            this.products.set(value);
            this.loadingModalService.hideLoadingModal()
          },
          error: (error) => {
            console.error('Ошибка загрузки объявлений:', error);
            this.loadingModalService.hideLoadingModal();
          }
        }
      )
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  clearSearch(): void {
    this.searchService.clearAllFilters();
  }
}
