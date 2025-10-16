import {inject, Injectable} from '@angular/core';
import {CategoryApi} from './category-api';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoryApi = inject(CategoryApi)

  getCategories() {
    this.categoryApi.getAllCategories()
      .subscribe((category) => {
        const catReq = category.map((category) => {
          this.categoryApi.getCategoryWithChildren(category.id)
            .subscribe((req) => {
              const lastReq = req
              setTimeout(() => {
                console.log('Категория: ', lastReq)
              }, 2000)
            })


        })

      })

  }
}

