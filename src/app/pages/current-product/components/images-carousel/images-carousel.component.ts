import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {CurrentProductInterface} from '../../current-product-interface';
import {GalleriaModule} from 'primeng/galleria';

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [
    GalleriaModule
  ],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesCarouselComponent implements OnInit {
  @Input() miniImg!:CurrentProductInterface;

  images: any[] | undefined;

  ngOnInit() {
    this.images = this.miniImg.imagesIds
  }
}
