import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {Dialog} from 'primeng/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {AuthStateService} from '../auth/services';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    Dialog,
    ReactiveFormsModule,
    Message
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  @Input() visible = false;
  @Output() closeShowPopupRegister = new EventEmitter()

  registerService = inject(RegisterService)
  authStateService = inject(AuthStateService)
  isLoading = this.authStateService.isLoading;

  onHide() {
    this.form.reset()
    this.closeShowPopupRegister.emit(this.visible!!);
  }

  form = new FormGroup({
    login: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(64)
    ]),
    name: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(64)
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ]),
  })

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return console.log('invalid register form');
    }

    const {login, name, password} = this.form.value;

    if (login && name && password) {
      console.log(this.form.value);
      this.registerService.getRegister({ login, name, password })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.closeShowPopupRegister.emit(this.visible = false);
          },
          error: (error) => {
            console.log('Ошибка регистрации', error);
          }
      })
    }
  }
}
