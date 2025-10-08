import {FormControl} from '@angular/forms';

export interface ProductFormModel {
  name: FormControl<string>;
  description: FormControl<string>;
  Images: FormControl<[]>;
  cost: FormControl<number>;
  email: FormControl<string>;
  location: FormControl<string>;
  categoryId: FormControl<string>;
  phone: FormControl<string>;

}
