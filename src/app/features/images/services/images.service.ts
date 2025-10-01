import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {ImagesInterface} from '../interfaces/images-interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends BaseService{
    getImages(id: string | undefined): Observable<ImagesInterface> {
      return this.getData<ImagesInterface>('Images/' + id)
    }
    postImages(): Observable<any> {
      return this.postData<any>('Images');
    }
}
