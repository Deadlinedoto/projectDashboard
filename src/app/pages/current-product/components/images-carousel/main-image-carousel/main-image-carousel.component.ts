import {Component, Input} from '@angular/core';
import {CurrentProductInterface} from '../../../current-product-interface';

@Component({
  selector: 'app-main-image-carousel',
  imports: [],
  templateUrl: './main-image-carousel.component.html',
  styleUrl: './main-image-carousel.component.scss',
  standalone: true
})
export class MainImageCarouselComponent {
  @Input() mainImg!: CurrentProductInterface
  @Input() imageIds: string[] = [];


  getImageUrl(id: string): string {
    return `http://dzitskiy.ru:5000/Images/${id}`
  }
 }
