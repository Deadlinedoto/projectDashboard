import {Component, inject, Input, OnInit, Signal} from '@angular/core';
import {CategoryApi} from '../../features/categories/services/category-api';
import {CategoryInterface} from '../../features/categories/interfaces';
import {TreeSelect, TreeSelectModule} from 'primeng/treeselect';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FileUpload} from 'primeng/fileupload';
import {DadataService} from '../../features/dadata/dadata.service';
import {NgxMaskDirective} from 'ngx-mask';
import {forkJoin} from 'rxjs';
import {ProductFormModel} from './models/product-form-model';
import {ProductFormService} from './services/product-form.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ImagesService} from '../../features/images/services/images.service';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    TreeTableModule,
    TreeSelect,
    FormsModule,
    TreeSelectModule,
    ButtonComponent,
    FileUpload,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.scss',
  standalone: true,
})


export class ProductFormComponent implements OnInit {
  private dadataService = inject(DadataService)
  private categoriesApi = inject(CategoryApi);
  private productFormService = inject(ProductFormService)
  private imagesService = inject(ImagesService)


  addressQuery: string = '';
  addressSuggestions: any[] = [];
  selectedAddress: string = '';

  uploadedFiles: any[] = [];
  uploadedImageIds: string[] = [];

  nodes: any[] = [];
  selectedNodes: any;

  productForm: FormGroup<ProductFormModel>

  productFormValue: Signal<any>

  categoryControl = new FormControl();

  ///КОНСТРУКТОР
  //!!!!

  constructor() {

    this.productForm = this.productFormService.getForm()
    console.log(this.productForm)

    this.productFormValue = toSignal(this.productForm.valueChanges)


    this.productForm = this.productFormService.getForm();


    this.categoryControl.valueChanges.subscribe(selectedNode => {
      if (selectedNode) {
        this.productForm.controls.categoryId.setValue(selectedNode.key);
      } else {
        this.productForm.controls.categoryId.setValue('');
      }
    });
  }

  productFormSubmit() {
    console.log(this.productForm.value)
  }
  getImages(event: any) {

  }

  onUploadImages(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  // onCustomUpload(event: any) {
  //   const files = event.files;
  //
  //   // Загружаем каждый файл через сервис
  //   files.forEach((file: File) => {
  //     this.imagesService.postImages(file.name, file.size).subscribe({
  //       next: (response) => {
  //         console.log('Файл загружен:', response);
  //         this.uploadedFiles.push({
  //           name: file.name,
  //           size: file.size,
  //           serverResponse: response
  //         });
  //       },
  //       error: (error) => {
  //         console.error('Ошибка загрузки:', error);
  //       }
  //     });
  //   });
  // }

  // onCustomUpload(event: any) {
  //   const files = event.files;
  //
  //   files.forEach((file: File) => {
  //     this.imagesService.uploadImages(file).subscribe({
  //       next: (response: ImagesResponseInterface) => {
  //         console.log('Файл загружен!', response);
  //
  //         this.uploadedFiles.push({
  //           name: file.name,
  //           size: file.size,
  //           serverResponse: response,
  //         })
  //         if (response.id) {
  //           this.uploadedImageIds.push(response.id);
  //           console.log('Айдишник сохранен', response.id);
  //
  //
  //         }
  //       },
  //       error: (error) => {
  //         console.log('Ошибка', error);
  //       }
  //       }
  //     )
  //   })
  // }





  //--------------------
  //ДАДАТА!!!!!
  //--------------------

  onAddressInput() {
    if (this.addressQuery.length < 2) {
      this.addressSuggestions = [];
      return;
    }
    this.dadataService.completeAddress(this.addressQuery).subscribe({
      next: (response: any) => {
        this.addressSuggestions = response.suggestions || [];
      },
      error: (error) => {
        console.error('Ошибка дадаты: ', error);
        this.addressSuggestions = [];
      }
    });
  }

  selectAddress(suggestion: any) {
    this.addressQuery = suggestion.value;
    this.selectedAddress = suggestion.value;
    this.addressSuggestions = [];
    this.productForm.controls.location.setValue(suggestion.value);
    console.log('Выбран адрес:', suggestion.value);
  }

  //--------------------
  //КАТЕГОРИИ!!!!!
  //--------------------

  ngOnInit() {
    this.loadCategories(
    )
  }

  loadCategories() {
    this.categoriesApi.getAllCategories()
      .subscribe((categories) => {
        const categoryRequests = categories.map(category =>
          this.categoriesApi.getCategoryWithChildren(category.id)
        );

        forkJoin(categoryRequests).subscribe((categoriesWithChildren) => {
          this.nodes = categoriesWithChildren.map(category => this.mapCategoryToTreeNode(category));
          console.log('Категории: ', this.nodes);
        });
      });
  }

  private mapCategoryToTreeNode(category: CategoryInterface): any {
    return {
      label: category.name,
      key: category.id,
      data: category,
      children: category.childs ? category.childs.map(child => this.mapCategoryToTreeNode(child)) : undefined,
      leaf: !category.childs || category.childs.length === 0
    };
  }

}
