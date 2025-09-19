import {Component, inject, OnInit} from '@angular/core';
import {AllCategoiesListService} from '../../features/categories/services/all-categoies-list.service';
import {AllCategoriesListInterface} from '../../features/categories/interfaces/all-categories-list-interface';
import {TreeSelect} from 'primeng/treeselect';
import {TreeSelectModule} from 'primeng/treeselect';
import {map, tap} from 'rxjs';
import { FormsModule } from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    TreeTableModule,
    TreeSelect,
    FormsModule,
    TreeSelectModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  standalone: true,
})
export class CreateProductComponent implements OnInit {
  categoriesApi = inject(AllCategoiesListService)
  nodes: any[string] = [];
  selectedNodes: any;
  isLoading: boolean = true;



  ngOnInit() {
    this.categoriesApi.getAllCategories()
      .pipe(
        tap(
          (response) => {
            this.nodes = [];
            response.forEach((value) => {
              this.nodes.push({
                label: value.name,
                value: value.id,
              })
              if (value.parentName === "00000000-0000-0000-0000-000000000000") {
              }
            })
            console.log('для списка:', this.nodes)
          }
        )
      )
      .subscribe()
  }


}
