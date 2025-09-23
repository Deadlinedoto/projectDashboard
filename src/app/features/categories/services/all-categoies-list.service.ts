import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../../core/services/http/api.service';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {AllCategoriesListInterface} from '../interfaces/all-categories-list-interface';
import {CurrentCategoryInterface} from '../interfaces/current-category-interface';

@Injectable({
  providedIn: 'root'
})
export class AllCategoiesListService extends BaseService{

  getAllCategories(): Observable<AllCategoriesListInterface[]> {
    return this.getData<AllCategoriesListInterface[]>('Categories');
  }
  getCategoryWithChildren(id: string): Observable<CurrentCategoryInterface[]> {
    return this.getData<CurrentCategoryInterface[]>(`Categories/${id}`);

  }
}
