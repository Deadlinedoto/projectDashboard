import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {CurrentProductInterface} from '../../current-product-interface';
import {TelephonePipe} from '../../../../shared/pipes/telephone.pipe';
import {ShowPhoneDialogService} from './show-phone-dialog.service';

@Component({
  selector: 'app-show-number',
  imports: [
    Dialog,
    TelephonePipe
  ],
  templateUrl: './show-phone-dialog-component.html',
  styleUrl: './show-phone-dialog-component.scss',
  standalone: true,
})
export class ShowPhoneDialogComponent {
  @Input() product?: CurrentProductInterface;
  @Output() closeShowPopup = new EventEmitter();

  showPhoneDialogService = inject(ShowPhoneDialogService);

  visible = this.showPhoneDialogService.showPhoneDialog;

  closeShowPhoneDialog() {
    this.showPhoneDialogService.closePhoneDialog();
  }
}
