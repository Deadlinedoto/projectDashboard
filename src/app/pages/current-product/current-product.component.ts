import { Component } from '@angular/core';
import {BreadcrumbsComponent} from '../../shared/components/ui/breadcrumbs/breadcrumbs.component';
import {ButtonNumberComponent} from '../../shared/components/ui/button-number/button-number.component';

@Component({
  selector: 'app-current-product',
  imports: [
    BreadcrumbsComponent,
    ButtonNumberComponent,
  ],
  templateUrl: './current-product.component.html',
  styleUrl: './current-product.component.scss'
})
export class CurrentProductComponent {
}
