import {Component, Input} from '@angular/core';
import {ProductMiniCardInterface} from './product-mini-card.interface';
import {RelativeTimePipe} from '../../../../shared/pipes/relative-time.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';

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
  @Input() product!: ProductMiniCardInterface
  protected readonly Array = Array;

}
