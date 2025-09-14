import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {MainImageCarouselComponent} from './main-image-carousel/main-image-carousel.component';
import {CurrentProductInterface} from '../../current-product-interface';
import {ApiService} from '../../../../core/services/http/api.service';
import {ImageService} from '../../../../core/services/image.service';
import {ImagesInterface} from '../../../../core/interfaces/images-interface';

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [
    MainImageCarouselComponent
  ],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesCarouselComponent {
  @Input() miniImages!: CurrentProductInterface;
  @Input() imageIds: string[] = [];


  public imageService = inject(ImageService)


}
