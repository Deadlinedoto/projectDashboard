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
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/message';
import {UserService} from '../../core/services';
import {LoadingModalComponent} from '../../features/loading-modal/loading-modal/loading-modal.component';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';
import {CurrentProductApiService} from '../current-product/services/current-product-api.service';

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
  private route = inject(ActivatedRoute);
  private productId: string | null = null;
  private currentProduct = inject(CurrentProductApiService)
  isEditMode = false;


  addressQuery: string = '';
  addressSuggestions: any[] = [];
  selectedAddress: string = '';

  selectedFiles: File[] = [];

  nodes: any[] = [];

  isLoadingCategories = false;


  productForm: FormGroup<ProductFormModel>
  productFormValue: Signal<any>
  categoryControl = new FormControl();

  ngOnInit() {
    this.loadCategories(
    )
  }


  //////
  ///////РЕДАКТИРОВАНИЕ ОБЪЯВЛЕНИЯ
  ///////


  loadProductData(productId: string) {
    this.loadingModalService.showLoadingModal('Загружаем данные объявления...');

    this.currentProduct.getSelectedProduct(productId).subscribe({
      next: (product) => {
        console.log(product);
        this.populateFormWithProductData(product);
        this.loadingModalService.hideLoadingModal();
      },
      error: (error) => {
        console.error('Ошибка загрузки данных объявления:', error);
        this.loadingModalService.hideLoadingModal();
      }
    });
  }

  private populateFormWithProductData(product: any) {

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      cost: product.cost,
      email: product.email || '',
      location: product.location,
      categoryId: product.category.id,
      phone: product.phone.slice(1),
    });

    this.addressQuery = product.location;
    this.selectedAddress = product.location;
  }


  ///КОНСТРУКТОР
  //!!!!

  constructor() {

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductData(this.productId);
      }
    });

    this.productForm = this.productFormService.getForm()
    console.log(this.productForm)


    this.productForm = this.productFormService.getForm();

    this.productFormValue = toSignal(this.productForm.valueChanges)


    if (!this.isEditMode) {
      this.categoryControl.valueChanges.subscribe(selectedNode => {
        if (selectedNode) {
          this.productForm.controls.categoryId.setValue(selectedNode.key);
        } else {
          this.productForm.controls.categoryId.setValue('');
        }
      });
    }
  }

  productFormSubmit() {

    this.loadingModalService.showLoadingModal(this.isEditMode ? 'Обновляем объявление...' : 'Создаем объявление...')

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

    if(this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file, index) => {
        formData.append('Images', file, file.name);
      });
    }


    console.log('Формдата отправляется с:', {
      name: formValue.name,
      description: formValue.description,
      cost: formValue.cost,
      email: formValue.email,
      location: formValue.location,
      categoryId: formValue.categoryId,
      phone: phoneAsNumber,
      images: this.selectedFiles
    });

    if (this.productForm.invalid) {
      this.loadingModalService.hideLoadingModal();
      console.log("Ошибка формы");
      return;
    }
    if (this.isEditMode && this.productId) {
      this.productFormApiService.updateProduct(this.productId, formData).subscribe({
        next: (res) => {
          this.userService.loadMe().subscribe(() => {
            this.loadingModalService.hideLoadingModal();
            this.router.navigate(['current-product/' + res.id]);
            window.scrollTo(0, 0);
          });
        },
        error: (error) => {
          console.error('Ошибка обновления:', error);
          this.loadingModalService.hideLoadingModal();
        }
      });
    } else {
      this.productFormApiService.createProduct(formData).subscribe({
        next: (res) => {
          this.userService.loadMe().subscribe(() => {
            this.loadingModalService.hideLoadingModal();
            this.router.navigate(['current-product/' + res.id]);
            window.scrollTo(0, 0);
          });
        },
        error: (error) => {
          console.error('Ошибка создания:', error);
          this.loadingModalService.hideLoadingModal();
        }
      });
    }

  }

  private markAllInputsAsTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });

    this.categoryControl.markAsTouched();
  }

  get name() {
    return this.productForm.get('name')
  }

  get description() {
    return this.productForm.get('description')
  }

  get cost() {
    return this.productForm.get('cost')
  }

  get email() {
    return this.productForm.get('email')
  }

  get location() {
    return this.productForm.get('location')
  }

  get categoryId() {
    return this.productForm.get('categoryId')
  }

  get phone() {
    return this.productForm.get('phone')
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

  onFileRemove(event: any) {
    this.selectedFiles = this.selectedFiles.filter(file => file !== event.file);
    console.log('Удален файл:', event.file.name);
    console.log('Остальные файлы:', this.selectedFiles);
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
