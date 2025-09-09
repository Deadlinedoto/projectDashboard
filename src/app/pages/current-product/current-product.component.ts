import {Component, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {ShowPhoneComponent} from './components/show-phone/show-phone-component';
import {CurrentProductInterface} from './current-product-interface';
import {ApiService} from '../../core/services/http/api.service';
import {ActivatedRoute} from '@angular/router';
import {PricePipe} from '../../shared/pipes/price.pipe';

@Component({
  selector: 'app-current-product-mini-card',
  imports: [
    BreadcrumbsComponent,
    ShowPhoneComponent,
    PricePipe,
  ],
  templateUrl: './current-product.component.html',
  styleUrl: './current-product.component.scss',
  standalone: true,
})
export class CurrentProductComponent implements OnInit {

  public selectedProduct!: CurrentProductInterface;
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
