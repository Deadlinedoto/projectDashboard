import {Component, inject, Input} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {ShowPhoneDialogComponent} from '../show-phone-dialog/show-phone-dialog-component';
import {CurrentProductInterface} from '../../current-product-interface';
import {ShowPhoneDialogService} from '../show-phone-dialog/show-phone-dialog.service';

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
  showPhoneDialogService = inject(ShowPhoneDialogService);

  constructor() {
  }
  showVisiblePopup() {
    this.showPhoneDialogService.openPhoneDialog()
  }
  closeShowPopup(value: boolean) {
    this.showPhoneDialogService.closePhoneDialog()
  }

}
