import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  public searchQuery = signal<string>('');

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
    this.searchQuery.set(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }

  clearSearchQuery(): void {
    this.setSearchQuery('');
  }

  filterProducts(products: any[], query: string): any[] {
    if (!query || query.trim() === '') {
      return products;
    }

    const searchTerm = query.toLowerCase().trim();

    return products.filter(product =>
      product.name && product.name.toLowerCase().includes(searchTerm)
    );
  }

}
