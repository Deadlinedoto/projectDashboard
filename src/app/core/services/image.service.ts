import {Injectable, Input} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {ImagesInterface} from '../interfaces/images-interface';
import {CurrentProductInterface} from '../../pages/current-product';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService{
  @Input() images!: CurrentProductInterface

  getImage(imageId: string): Observable<ImagesInterface> {
      return this.getData<ImagesInterface>('Images/' + imageId)
  }

}
