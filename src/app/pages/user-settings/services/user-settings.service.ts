import {inject, Injectable} from '@angular/core';
import {BaseService} from '../../../core/services';
import {Observable} from 'rxjs';
import {UserSettingsInterface} from '../interfaces/user-settings-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductFormResponse} from '../../product-form/interfaces/product-form-response';
import {UserSettingsResponseInterface} from '../interfaces/user-settings-response-interface';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService extends BaseService{

  private _fb = inject(FormBuilder)

  changeUserSettings(): FormGroup {
      return this._fb.group({
        login: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64)
        ]],
        name: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64)
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]],
      })
  }

  createProduct(request: any): Observable<ProductFormResponse> {
    return this.postData<ProductFormResponse>('Advert', request)
  }
  putChangeProfile(id: string | undefined, payload: any): Observable<UserSettingsResponseInterface> {
    return this.putData<UserSettingsResponseInterface>('Users/' + id, payload)
  }

  // putChangeProfile(id: string | undefined, payload: UserSettingsInterface): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('Name', payload.name);
  //   formData.append('Login', payload.login);
  //   formData.append('Password', payload.password);
  //
  //   return this.putData<any>('Users/' + id, formData)
  // }
}
