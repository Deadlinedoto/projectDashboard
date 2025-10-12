import {Component, inject, OnInit, Signal} from '@angular/core';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../core/services';
import {NgxMaskDirective} from 'ngx-mask';
import {UserSettingsService} from './services/user-settings.service';
import {UserSettingsModel} from './models/user-settings-model';
import {toSignal} from '@angular/core/rxjs-interop';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-user-settings',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    Toast
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  providers: [MessageService],
})
export class UserSettingsComponent implements OnInit {

  private userSettingsService = inject(UserSettingsService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);


  userSettingsForm: FormGroup<UserSettingsModel>;
  userSettingsFormValue: Signal<any>


  constructor() {
    this.userSettingsForm = this.userSettingsService.changeUserSettings()
    this.userSettingsFormValue = toSignal(this.userSettingsForm.valueChanges)
  }


  ngOnInit() {
    const currentUser = this.userService.user()
    this.userSettingsForm.patchValue({
      name: currentUser?.name,
      login: currentUser?.login,
      password: '',
    })
    console.log('Айдишник пользователя:', this.userService.userId());
    console.log('Текущий пользователь:', currentUser)
  }

  changeProfile() {
    const formData = new FormData();
    const formValue = this.userSettingsFormValue();

    formData.append('name', formValue.name);
    formData.append('login', formValue.login);
    formData.append('password', formValue.password);

    console.log('Форм дата отправляется с:', {
        name: formValue.name,
        login: formValue.login,
        password: formValue.password,
      }
    );
    if(this.userSettingsForm.invalid) {
      console.log('Ошибка формы')
    }
    else {
      this.userSettingsService.putChangeProfile(this.userService.userId(), formData).subscribe(
        (res) => {
          console.log('Профиль успешно обновлен: ', res)
          this.messageService.add({severity: 'info', summary: 'Успешно', detail: 'Профиль успешно обновлен'});
          this.userService.loadMe().subscribe(
            (res) => {
              console.log('Новые данные пользователя: ', res)
            }
          )
          this.userSettingsForm.patchValue({
            password: ''
          })
        }
      )
    }



  }

}
