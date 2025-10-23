import {Component, EventEmitter, inject, input, Input, output, Output, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Checkbox} from 'primeng/checkbox';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {AuthService} from './services';
import {NgxMaskDirective} from 'ngx-mask';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  imports: [
    Dialog,
    Checkbox,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
    NgxMaskDirective,

  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent {
  visible = input(false);
  closeShowPopupLogin = output<boolean>();
  showPassword = signal<boolean>(false);
  rememberMe: boolean = false;

  authService = inject(AuthService)
  private _fb = inject(FormBuilder)
  private messageService = inject(MessageService)

  authForm: FormGroup;


  constructor() {
    this.authForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onHide(): void {
    this.closeShowPopupLogin.emit(false);
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.authService.login(this.authForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.onHide()
            this.messageService.add({severity: 'info', summary: 'Успешно', detail: 'Вы успешно авторизировались'});
            this.authForm.reset()
          },
          error: err => {
            console.log('Ошибка регистрации', err);
            this.messageService.add({ severity: 'error', summary: 'Отмена', detail: 'Неверный логин или пароль' });
            this.authForm.get('password')?.patchValue('')
          }
        });
    }
    else this.messageService.add({ severity: 'error', summary: 'Отмена', detail: 'Неверный логин или пароль' });
  }
}
