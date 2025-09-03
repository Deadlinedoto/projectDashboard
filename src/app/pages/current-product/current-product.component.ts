import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from '../../shared/components/ui/breadcrumbs/breadcrumbs.component';
import {ButtonNumberComponent} from '../../shared/components/ui/button-number/button-number.component';
import {ProductInterface} from '../../features/products/services/product-interface';
import {ApiService} from '../../core/services/http/api.service';
import {ActivatedRoute} from '@angular/router';
import {PricePipe} from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-current-product',
  imports: [
    BreadcrumbsComponent,
    ButtonNumberComponent,
    PricePipe,
  ],
  templateUrl: './current-product.component.html',
  styleUrl: './current-product.component.scss'
})
export class CurrentProductComponent implements OnInit {

  public selectedProduct!: ProductInterface;
  public idSelectAdd!: string

  constructor(private apiService: ApiService, private _route: ActivatedRoute ) {
  }

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
        })
  }

}
