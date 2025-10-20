import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../core/services';
import {CurrentProductInterface} from '../current-product';
import {PricePipe} from '../../shared/pipes/price.pipe';
import {RelativeTimePipe} from '../../shared/pipes/relative-time.pipe';
import {Router, RouterLink} from '@angular/router';
import {CurrentProductApiService} from '../current-product/services/current-product-api.service';
import {LoadingModalService} from '../../features/loading-modal/loading-modal/services/loading-modal.service';
import {LoadingModalComponent} from '../../features/loading-modal/loading-modal/loading-modal.component';

@Component({
  selector: 'app-my-products',
  imports: [
    PricePipe,
    RelativeTimePipe,
    RouterLink,
    LoadingModalComponent
  ],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss',
  standalone: true
})
export class MyProductsComponent implements OnInit {
  userService = inject(UserService);


  myProducts: CurrentProductInterface[] = []

  private currentProductApiService = inject(CurrentProductApiService)
  private loadingModalService = inject(LoadingModalService);



  ngOnInit() {
    console.log(this.userService.user());
    console.log(this.userService.userName());
    console.log(this.userService.myProductsId(), 'Вот же они');
    this.loadingModalService.showLoadingModal('Загружаем объявления')


    this.loadMyProducts()

    if (!this.userService.user()) {
      this.userService.loadMe();
    } else {
    }
  }



  loadMyProducts() {

    const productsId = this.userService.myProductsId();
    let completed = 0

    for (let i = 0; i < productsId.length; i++) {
      const id = productsId[i];

      this.currentProductApiService.getSelectedProduct(id).subscribe({
          next: (product) => {
            this.myProducts.push(product)
            completed++
            setTimeout(() => {
              this.loadingModalService.hideLoadingModal()
            }, 500)

            if (completed === productsId.length) {
              console.log('Все объявы загружены', this.myProducts)
            }
          }
        }
      )
    }
  }

}
