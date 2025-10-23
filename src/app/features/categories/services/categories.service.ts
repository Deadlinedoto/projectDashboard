import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {CategoryApi} from './category-api';
import {catchError, of, tap} from 'rxjs';
import {CategoriesStoreService} from './categories-store.service';
import {transformCategories} from './transform-categories';
import {CategoryInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly categoryService = inject(CategoryApi);
  private readonly categoryStore = inject(CategoriesStoreService);

  private readonly _selectedCategory = signal<CategoryInterface | null>(null);
  readonly selectedCategory = this._selectedCategory.asReadonly();

  private readonly _childCategories = signal<CategoryInterface[]>([]);
  readonly childCategories = this._childCategories.asReadonly();

  private readonly _isLoadingChildren = signal(false);
  readonly isLoadingChildren = this._isLoadingChildren.asReadonly();

  constructor() {
    effect(() => {
      this.categoryService
        .getAllCategories()
        .pipe(
          tap((categories) => {
            this.categoryStore.setAllCategories(categories);
            if (categories && categories.length > 0) {
              const transformed = transformCategories(categories);
              if (transformed.length > 0) {
                this.selectCategory(transformed[0]);
              }
            }
          }),
          catchError(() => {
            this.categoryStore.clearAllCategories();
            return of(null);
          }),
        )
        .subscribe();
    });
  }

  readonly allCategories = computed(() =>
    transformCategories(this.categoryStore.allCategories()),
  );

  selectCategory(category: CategoryInterface): void {
    this._selectedCategory.set(category);

    if (category.childs && category.childs.length > 0) {
      this._childCategories.set(category.childs);
    } else {
      this._isLoadingChildren.set(true);
      this.categoryService.getCategoryWithChildren(category.id)
        .pipe(
          tap((categoryWithChildren) => {
            this._childCategories.set(categoryWithChildren.childs || []);
            this._isLoadingChildren.set(false);
          }),
          catchError((error) => {
            console.error('Ошибка загрузки дочернх категорий', error);
            this._childCategories.set([]);
            this._isLoadingChildren.set(false);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}

