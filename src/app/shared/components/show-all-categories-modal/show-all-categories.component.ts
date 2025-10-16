import { Component } from '@angular/core';
import {ButtonComponent} from '../ui/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-show-all-categories-modal',
  imports: [
    ButtonComponent,
    Dialog
  ],
  templateUrl: './show-all-categories.component.html',
  styleUrl: './show-all-categories.component.scss'
})
export class ShowAllCategoriesComponent {
  visible: boolean = false;
  isCategoriesOpen = false;

  showDialog() {
    this.visible = !this.visible;
    this.isCategoriesOpen = true;
  }
}
