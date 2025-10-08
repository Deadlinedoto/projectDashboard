import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import {CategoryApi} from '../../features/categories/services/category-api';
import {CategoryInterface} from '../../features/categories/interfaces';
import {TreeSelect, TreeSelectModule} from 'primeng/treeselect';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FileUpload, UploadEvent} from 'primeng/fileupload';
import {DadataService} from '../../features/dadata/dadata.service';
import {NgxMaskDirective} from 'ngx-mask';
import {forkJoin} from 'rxjs';
import {ProductFormModel} from './models/product-form-model';
import {ProductFormService} from './services/product-form.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ImagesService} from '../../features/images/services/images.service';
import {ProductFormApiService} from './services/product-form-api.service';
import {UploadImagesInterface} from '../../features/images/interfaces/upload-images-interface';

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
  private productFormApiService = inject(ProductFormApiService)


  addressQuery: string = '';
  addressSuggestions: any[] = [];
  selectedAddress: string = '';

  selectedFiles: File[] = [];

  nodes: any[] = [];

  uploadedImages = signal<UploadImagesInterface[]>([]);

  productForm: FormGroup<ProductFormModel>
  productFormValue: Signal<any>
  categoryControl = new FormControl();

  ///КОНСТРУКТОР
  //!!!!

  constructor() {

    this.productForm = this.productFormService.getForm()
    console.log(this.productForm)


    this.productForm = this.productFormService.getForm();

    this.productFormValue = toSignal(this.productForm.valueChanges)


    this.categoryControl.valueChanges.subscribe(selectedNode => {
      if (selectedNode) {
        this.productForm.controls.categoryId.setValue(selectedNode.key);
      } else {
        this.productForm.controls.categoryId.setValue('');
      }
    });
  }

  productFormSubmit() {
    const formData = new FormData();
    const cleanPhone = this.productForm.value.phone?.replace(/\D/g, '') || '';
    const phoneAsNumber = cleanPhone ? Number(cleanPhone) : 0;
    const formValue = this.productFormValue()


    formData.append('name', formValue.name)
    formData.append('description', formValue.description)
    formData.append('cost', formValue.cost)
    formData.append('email', formValue.email)
    formData.append('location', formValue.location)
    formData.append('categoryId', formValue.categoryId)
    formData.append('phone', phoneAsNumber.toString())

    this.selectedFiles.forEach((file, index) => {
      formData.append('Images', file, file.name);
    });

    console.log('Формдата отправляется с:', {
      name: formValue.name,
      description: formValue.description,
      cost: formValue.cost,
      email: formValue.email,
      location: formValue.location,
      categoryId: formValue.categoryId,
      phone: phoneAsNumber,
      images: formValue.selectedFiles
    });

    this.productFormApiService.createProduct(formData).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }


  //--------------------
  //ЗАГРУЗКА КАРТИНОК!!!
  //--------------------

  onFileSelect(event: any) {
    this.selectedFiles = [...this.selectedFiles, ...event.files];
    console.log('Выбранные файлы:', this.selectedFiles);
  }
  onFileClear() {
    this.selectedFiles = [];
    console.log('Все файлы удадены');
  }





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
