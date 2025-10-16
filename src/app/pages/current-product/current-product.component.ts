import {Component, inject, OnInit} from '@angular/core';
import {ShowPhoneComponent} from './components/show-phone/show-phone-component';
import {CurrentProductInterface} from './current-product-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {PricePipe} from '../../shared/pipes/price.pipe';
import {ImagesCarouselComponent} from './components/images-carousel/images-carousel.component';
import {UserService} from '../../core/services';
import {ButtonComponent} from '../../shared/components/ui/button';
import {CurrentProductApiService} from './services/current-product-api.service';
import {CategoryApi} from '../../features/categories/services/category-api';
import {RelativeTimePipe} from '../../shared/pipes/relative-time.pipe';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {LoadingModalComponent} from '../../features/loading-modal/loading-modal/loading-modal.component';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';

@Component({
  selector: 'app-current-product-mini-card',
  imports: [
    ShowPhoneComponent,
    PricePipe,
    ImagesCarouselComponent,
    ButtonComponent,
    RelativeTimePipe,
    Toast,
    ConfirmDialog,
    LoadingModalComponent,

  ],
  templateUrl: './current-product.component.html',
  styleUrl: './current-product.component.scss',
  standalone: true,
  providers: [ConfirmationService, MessageService]
})
export class CurrentProductComponent implements OnInit {

  public selectedProduct!: CurrentProductInterface;
  public idSelectAdd!: string
  public images: string[] = []
  public parentCategoryName: string = ''
  public city = ''


  public showEditButton: boolean = false;

  private currentProductApiService = inject(CurrentProductApiService);
  private _route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);
  private categoryApiService = inject(CategoryApi);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private loadingModalService = inject(LoadingModalService);



  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы уверены, что хотите удалить объявление?',
      header: 'Удалить объявление',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Отменить',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Удалить',
        severity: 'danger',
      },

      accept: () => {
        this.loadingModalService.showLoadingModal('Удаляем объявление...')
        this.currentProductApiService.deleteMyProduct(this.selectedProduct.id).subscribe(
          (res) => {
            console.log('Объявление удалено', res)

            this.userService.loadMe().subscribe(() => {
              this.loadingModalService.hideLoadingModal();
              this.messageService.add({ severity: 'info', summary: 'Успешно', detail: 'Объявление удалено' });
              this.router.navigate(['/my-products']);
            })
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Отмена', detail: 'Объявление не удалено' });
      },
    });
  }





  ngOnInit() {

    this._route.params.subscribe(params => {
      this.idSelectAdd = params['id'];
      this.getSelectedProduct(this.idSelectAdd)
    })


  }


  private takeCityFormAddress (fullAddress: string): string {
    const addressParts = fullAddress.split(',');
    return addressParts[0]?.trim() || fullAddress;
  }

  getSelectedProduct(id: string) {
    this.currentProductApiService.getSelectedProduct(id)
      .subscribe((res) => {
        console.log(res)
        this.selectedProduct = res
        this.images = res.imagesIds || []
        this.itsMyProduct()
        this.getParentCategoryName()
        console.log(this.selectedProduct.location)
        this.city = this.takeCityFormAddress(this.selectedProduct.location)
      })
  }

  getParentCategoryName() {
    if (this.selectedProduct.category.parentId === "00000000-0000-0000-0000-000000000000") {
      console.log('Дочерних нет!')
    }
    else {
      this.categoryApiService.getCategoryWithChildren(this.selectedProduct.category.parentId).subscribe(
        (res) => {
          console.log(res)
          this.parentCategoryName = res.name
          console.log(this.parentCategoryName)
        }
      )
    }

  }



  private itsMyProduct() {
    if (this.userService.userId() === this.selectedProduct.user.id) {
      this.showEditButton = true;
    } else console.log('НЕ Я');
    console.log(this.showEditButton);
  }



}
