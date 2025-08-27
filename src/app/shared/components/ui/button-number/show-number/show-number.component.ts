import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-show-number',
  imports: [
    Dialog
  ],
  templateUrl: './show-number.component.html',
  styleUrl: './show-number.component.scss'
})
export class ShowNumberComponent {
  @Input() visible: boolean = false;
  @Output() closeShowPopup = new EventEmitter();

  onHide(): void {
    this.visible = false
    this.closeShowPopup.emit(this.visible);
  }
}
