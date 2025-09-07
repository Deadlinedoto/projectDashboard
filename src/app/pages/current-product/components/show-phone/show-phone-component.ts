import {Component, Input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {ShowPhoneDialogComponent} from '../show-phone-dialog/show-phone-dialog-component';
import {CurrentProductInterface} from '../../current-product-interface';

@Component({
  selector: 'app-show-phone',
  standalone: true,
  imports: [
    ButtonModule,
    ShowPhoneDialogComponent
  ],
  templateUrl: './show-phone-component.html',
  styleUrl: './show-phone-component.scss'
})
export class ShowPhoneComponent {
  @Input() product!: CurrentProductInterface;
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
