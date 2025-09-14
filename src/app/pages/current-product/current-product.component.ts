import {Component, inject, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {ShowPhoneComponent} from './components/show-phone/show-phone-component';
import {CurrentProductInterface} from './current-product-interface';
import {ApiService} from '../../core/services/http/api.service';
import {ActivatedRoute} from '@angular/router';
import {PricePipe} from '../../shared/pipes/price.pipe';
import {ImagesCarouselComponent} from './components/images-carousel/images-carousel.component';
import {ImagesInterface} from '../../core/interfaces/images-interface';
import {ImageService} from '../../core/services/image.service';

@Component({
  selector: 'app-current-product-mini-card',
  imports: [
    BreadcrumbsComponent,
    ShowPhoneComponent,
    PricePipe,
    ImagesCarouselComponent,

  ],
  templateUrl: './current-product.component.html',
  styleUrl: './current-product.component.scss',
  standalone: true,
})
export class CurrentProductComponent implements OnInit {

  public selectedProduct!: CurrentProductInterface;
  public idSelectAdd!: string
  public images: string[] = []

  private imageService = inject(ImageService)
  private apiService = inject(ApiService);
  private _route = inject(ActivatedRoute);


  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idSelectAdd = params['id'];
      this.getSelectedProduct(this.idSelectAdd)
    })

  }
  getSelectedProduct(id: string) {
      this.apiService.getSelectedProduct(id)
        .subscribe((res) => {
          console.log(res)
          this.selectedProduct = res
          this.images = res.imagesIds || []
        })
  }

}
