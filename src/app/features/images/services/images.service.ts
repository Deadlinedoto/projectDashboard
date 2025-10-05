import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {ImagesResponseInterface} from '../interfaces/images-response-interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends BaseService{
    getImages(id: string | undefined): Observable<ImagesResponseInterface> {
      return this.getData<ImagesResponseInterface>('Images/' + id)
    }
    postImages(advertId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('AdvertId', advertId);
      formData.append('File', file);
      return this.postData<any>('Images', formData);
    }
    uploadImages(file: File): Observable<ImagesResponseInterface> {
        const formData = new FormData();
        formData.append('Content', file);
        return this.postData<ImagesResponseInterface>('Images', formData);
    }
}
