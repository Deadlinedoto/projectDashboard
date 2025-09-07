import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ProductInterface} from '../../../../features/products/services/product-interface';
import {TelephonePipe} from '../../../../shared/pipes/telephone.pipe';

@Component({
  selector: 'app-show-number',
  imports: [
    Dialog,
    TelephonePipe
  ],
  templateUrl: './show-phone-dialog-component.html',
  styleUrl: './show-phone-dialog-component.scss'
})
export class ShowPhoneDialogComponent {
  @Input() product?: ProductInterface;
  @Input() visible: boolean = false;
  @Output() closeShowPopup = new EventEmitter();

  onHide(): void {
    this.visible = false
    this.closeShowPopup.emit(this.visible);
  }
}
