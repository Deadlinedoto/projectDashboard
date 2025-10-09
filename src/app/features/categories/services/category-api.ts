import {Injectable} from '@angular/core';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {CategoryDTOInterface, CategoryInterface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryApi extends BaseService{


  getAllCategories(): Observable<CategoryInterface[]> {
    return this.getData<CategoryInterface[]>('Categories');
  }
  getCategoryWithChildren(id: string): Observable<CategoryInterface> {
    return this.getData<CategoryDTOInterface>(`Categories/${id}`)
  }

}
