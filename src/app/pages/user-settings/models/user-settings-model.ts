import {FormControl} from '@angular/forms';

export interface UserSettingsModel {
  name: FormControl<string>;
  login: FormControl<string>;
  password: FormControl<string>;
}
