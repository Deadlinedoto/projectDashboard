import {Component, inject, OnInit} from '@angular/core';
import {CategoryApi} from '../../features/categories/services/category-api';
import {CategoryInterface} from '../../features/categories/interfaces/category-interface';
import {TreeSelect} from 'primeng/treeselect';
import {TreeSelectModule} from 'primeng/treeselect';
import {finalize, map, tap} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AuthStateService} from '../../features/auth/components/auth/services';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    TreeTableModule,
    TreeSelect,
    FormsModule,
    TreeSelectModule,
    ProgressSpinner,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  standalone: true,
})
export class CreateProductComponent implements OnInit {
  categoriesApi = inject(CategoryApi)
  authStateService = inject(AuthStateService)
  nodes: any[string] = [];
  currentCategories: any[string] = [];
  selectedNodes: any;


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
              if (value.name === "00000000-0000-0000-0000-000000000000") {
                console.log('Родитель!!')
              }
            })
            console.log('для списка:', this.nodes)
          }
        )
      )
      .subscribe()


  }


}
