import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CategoryInterface} from '../../../../features/categories/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<CategoryInterface | null>(null);
  public selectedCategory$ = this.selectedCategorySubject.asObservable();

  public searchQuery = signal<string>('');
  public selectedCategory = signal<CategoryInterface | null>(null);

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
    this.searchQuery.set(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }
  setSelectedCategory(category: CategoryInterface | null): void {
    this.selectedCategorySubject.next(category);
    this.selectedCategory.set(category);
  }

  getSelectedCategory(): CategoryInterface | null {
    return this.selectedCategorySubject.value;
  }

  clearSelectedCategory(): void {
    this.setSelectedCategory(null);
  }

  clearSearchQuery(): void {
    this.setSearchQuery('');
  }

  clearAllFilters(): void {
    this.clearSearchQuery();
    this.clearSelectedCategory();
  }

  filterProducts(products: any[], query: string): any[] {
    let filteredProducts = products;

    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(product =>
        product.name && product.name.toLowerCase().includes(searchTerm)
      );
    }
    return filteredProducts;
  }

}
