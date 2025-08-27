import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {PrimengButtonModule} from '../../../../core/modules/primeng-button/primeng-button.module';
import {ShowNumberComponent} from './show-number/show-number.component';

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
  public isVisiblePopup = false;
  public closeVisiblePopup = true

  constructor() {
  }
  showVisiblePopup() {
    this.isVisiblePopup = !this.isVisiblePopup
  }
  closeShowPopup(value: boolean) {
    this.isVisiblePopup = value
  }

}
