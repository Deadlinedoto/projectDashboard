import {Component, Input, Output} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {PrimengButtonModule} from '../../../../core/modules/primeng-button/primeng-button.module';
import {ShowNumberComponent} from './show-number/show-number.component';
import {ProductInterface} from '../../../../features/products/services/product-interface';

@Component({
  selector: 'app-button-number',
  imports: [
    ButtonModule,
    PrimengButtonModule,
    ShowNumberComponent
  ],
  templateUrl: './button-number.component.html',
  styleUrl: './button-number.component.scss'
})
export class ButtonNumberComponent {
  @Input() product!: ProductInterface;
  public isVisiblePopup = false;

  constructor() {
  }
  showVisiblePopup() {
    this.isVisiblePopup = !this.isVisiblePopup
  }
  closeShowPopup(value: boolean) {
    this.isVisiblePopup = value
  }

}
