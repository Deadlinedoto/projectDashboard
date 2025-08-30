import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-auth',
  imports: [
    Dialog
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  @Input() visible: boolean = false;
  @Output() closeShowPopupLogin = new EventEmitter();

  onHide(): void {
    this.visible = false;
    this.closeShowPopupLogin.emit(this.visible);
  }
}
