import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFormModel} from '../models/product-form-model';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  // form: FormGroup<ProductFormModel>;

  private _fb = inject(FormBuilder)

  getForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(250)]],
      images: [[]],
      cost: [null, [Validators.required, Validators.min(1)]],
      email: [''],
      location: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

}
