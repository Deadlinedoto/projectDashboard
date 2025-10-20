import {Component, inject, OnInit, Signal} from '@angular/core';
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
import {ProductFormApiService} from './services/product-form-api.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/message';
import {UserService} from '../../core/services';
import {LoadingModalComponent} from '../../features/loading-modal/loading-modal/loading-modal.component';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';

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
    Message,
    LoadingModalComponent,
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.scss',
  standalone: true,
})


export class ProductFormComponent implements OnInit {
  private dadataService = inject(DadataService)
  private categoriesApi = inject(CategoryApi);
  private productFormService = inject(ProductFormService)
  private productFormApiService = inject(ProductFormApiService)
  private router = inject(Router);
  private userService = inject(UserService)
  private loadingModalService = inject(LoadingModalService)


  addressQuery: string = '';
  addressSuggestions: any[] = [];
  selectedAddress: string = '';

  selectedFiles: File[] = [];

  nodes: any[] = [];

  isLoading = false;
  isLoadingCategories = false;


  productForm: FormGroup<ProductFormModel>
  productFormValue: Signal<any>
  categoryControl = new FormControl();

  ngOnInit() {
    this.loadCategories(
    )
  }

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

    this.loadingModalService.showLoadingModal('Создаем объявление...')

    this.markAllInputsAsTouched();

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

    if (this.productForm.invalid) {
      this.loadingModalService.hideLoadingModal();
      console.log("Ошибка формы");
    } else {
      this.productFormApiService.createProduct(formData).subscribe(
        (res) => {
          console.log(res)

          this.userService.loadMe().subscribe(() => {
            this.loadingModalService.hideLoadingModal();
            this.router.navigate(['current-product/' + res.id]);
            window.scrollTo(0, 0);
          })
        }
      )
    }

  }

  private markAllInputsAsTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });

    this.categoryControl.markAsTouched();
  }

  get name() { return this.productForm.get('name') }
  get description() { return this.productForm.get('description') }
  get cost() { return this.productForm.get('cost') }
  get email() { return this.productForm.get('email') }
  get location() { return this.productForm.get('location') }
  get categoryId() { return this.productForm.get('categoryId') }
  get phone() { return this.productForm.get('phone')}


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


  loadCategories() {
    this.categoryControl.disable();
    this.isLoadingCategories = true;

    this.categoriesApi.getAllCategories()
      .subscribe((categories) => {
        const categoryRequests = categories.map(category =>
          this.categoriesApi.getCategoryWithChildren(category.id)
        );

        forkJoin(categoryRequests).subscribe({
          next: (categoriesWithChildren) => {
            this.nodes = categoriesWithChildren.map(category => this.mapCategoryToTreeNode(category));
            console.log('Категории: ', this.nodes);
            this.isLoadingCategories = false;
            this.categoryControl.enable();
          },
          error: (error) => {
            console.error('Ошибка загрузки категорий:', error);
            this.isLoadingCategories = false;
            this.categoryControl.enable();
          }
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
