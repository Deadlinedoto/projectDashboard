import {Injectable, signal} from '@angular/core';
import {CategoryInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService {
  private readonly _allCategories = signal<CategoryInterface[]>([]);
  readonly allCategories = this._allCategories.asReadonly();

  setAllCategories(categories: CategoryInterface[]) {
    this._allCategories.set(categories);
  }

  clearAllCategories() {
    this._allCategories.set([]);
  }
}
