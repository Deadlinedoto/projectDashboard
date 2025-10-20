import {Component, inject} from '@angular/core';
import {CategoriesService} from '../../../features/categories/services/categories.service';


@Component({
  selector: 'app-show-all-categories-modal',
  imports: [],
  templateUrl: './show-all-categories.component.html',
  styleUrl: './show-all-categories.component.scss',
  standalone: true,
})
export class ShowAllCategoriesComponent {

  private categoriesService = inject(CategoriesService);

  categories = this.categoriesService.allCategories;
  childCategories = this.categoriesService.childCategories;
  selectedCategory = this.categoriesService.selectedCategory;
  isLoadingChildren = this.categoriesService.isLoadingChildren;

  onCategorySelect(category: any): void {
    this.categoriesService.selectCategory(category);
  }

}
