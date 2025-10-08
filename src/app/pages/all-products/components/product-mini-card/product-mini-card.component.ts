import {Component, Input} from '@angular/core';
import {ProductMiniCardInterface} from './product-mini-card.interface';
import {RelativeTimePipe} from '../../../../shared/pipes/relative-time.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';
import {CurrentProductInterface} from '../../../current-product';



@Component({
  selector: 'app-product-mini-card',
  imports: [
    RelativeTimePipe,
    PricePipe
  ],
  templateUrl: './product-mini-card.component.html',
  styleUrl: './product-mini-card.component.scss',
  standalone: true,
})
export class ProductMiniCardComponent {

  @Input() myProduct!: CurrentProductInterface
  @Input() product!: ProductMiniCardInterface
  @Input() imageIds: any[] = []

}
