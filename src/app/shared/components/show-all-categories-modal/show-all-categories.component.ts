import {Component, inject, input, output} from '@angular/core';
import {CategoriesService} from '../../../features/categories/services/categories.service';
import {SearchService} from '../../../common/components/header/services/search.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-show-all-categories-modal',
  imports: [],
  templateUrl: './show-all-categories.component.html',
  styleUrl: './show-all-categories.component.scss',
  standalone: true,
})
export class ShowAllCategoriesComponent {

  private categoriesService = inject(CategoriesService);
  private searchService = inject(SearchService);
  private router = inject(Router);

  closeModal = output<void>();

  categories = this.categoriesService.allCategories;
  childCategories = this.categoriesService.childCategories;
  selectedCategory = this.categoriesService.selectedCategory;
  isLoadingChildren = this.categoriesService.isLoadingChildren;

  onCategorySelect(category: any): void {
    this.categoriesService.selectCategory(category);
  }
  onParentCategoryClick(parentCategory: any): void {
    this.searchService.setSelectedCategory(parentCategory);
    this.searchService.clearSearchQuery();
    this.router.navigate(['/']);
    this.closeModal.emit();
  }

  onChildCategoryClick(childCategory: any): void {
    this.searchService.setSelectedCategory(childCategory);
    this.searchService.clearSearchQuery();
    this.router.navigate(['/']);
    this.closeModal.emit();
  }

}
