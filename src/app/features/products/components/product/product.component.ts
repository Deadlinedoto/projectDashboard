import {Component, Input} from '@angular/core';
import {AllProductsInterface} from '../../services/all-products.interface';
import {RelativeTimePipe} from '../../../../shared/pipes/relative-time.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-product',
  imports: [
    RelativeTimePipe,
    PricePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: AllProductsInterface
}
