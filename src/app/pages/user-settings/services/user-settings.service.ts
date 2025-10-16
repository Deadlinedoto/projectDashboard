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
      },
      )
  }

  putChangeProfile(id: string | undefined, payload: any): Observable<UserSettingsResponseInterface> {
    return this.putData<UserSettingsResponseInterface>('Users/' + id, payload)
  }

}
