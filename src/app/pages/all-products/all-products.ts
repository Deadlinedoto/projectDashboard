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
  private searchSubscription?: Subscription;


  products = signal<any[]>([]);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(24);
  isLoading = signal<boolean>(false);

  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage());
  });

  filteredProducts = computed(() => {
    const searchQuery = this.searchService.searchQuery();
    const productsArray = this.products();
    if (searchQuery && searchQuery.trim() !== '') {
      return this.searchService.filterProducts(productsArray, searchQuery);
    }
    return productsArray;
  });



  ngOnInit() {

    this.searchService.selectedCategory$.subscribe(category => {
      this.currentPage.set(1);
      this.loadProducts(category?.id);
    });

    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.currentPage.set(1)
    });
  }



  loadProducts(categoryId?: string) {
    this.loadingModalService.showLoadingModal('Загружаем объявления')

    const selectedCategory = this.searchService.getSelectedCategory();
    const finalCategoryId = categoryId || selectedCategory?.id;

    this.apiService.getAllProducts(finalCategoryId)
      .subscribe({
          next: (value) => {
            console.log(value);
            console.log('2 раза');
            this.products.set(value);
            this.loadingModalService.hideLoadingModal()
            this.currentPage.set(1);
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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  getPageRange(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const range = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift(-1);
    }
    if (current + delta < total - 1) {
      range.push(-1);
    }

    range.unshift(1);
    if (total > 1) {
      range.push(total);
    }

    return range;
  }
}
