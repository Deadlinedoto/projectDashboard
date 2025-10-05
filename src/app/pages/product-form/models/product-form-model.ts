import {FormControl} from '@angular/forms';

export interface ProductFormModel {
  name: FormControl<string>;
  description: FormControl<string>;
  images: FormControl<[]>;
  cost: FormControl<string>;
  email: FormControl<string>;
  location: FormControl<string>;
  categoryId: FormControl<string>;
  phone: FormControl<string>;

}
