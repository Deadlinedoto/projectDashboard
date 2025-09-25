import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {AuthStateService} from '../auth/services';
import {Message} from 'primeng/message';
import {NgxMaskDirective} from 'ngx-mask';


@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    Dialog,
    ReactiveFormsModule,
    Message,
    NgxMaskDirective,

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
    this.closeShowPopupRegister.emit(false);
  }

  formRegister: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formRegister = formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
    })
  }

  register() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      console.log('Форма невалидна');
      return;
    }
    this.registerService.getRegister(this.formRegister.value).subscribe({
      next: (res) => {
        console.log(res)
        console.log(this.formRegister.value)
        this.closeShowPopupRegister.emit(false);
        this.formRegister.reset()
      }
    })
  }
  // form = new FormGroup({
  //   login: new FormControl<string | null>('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(64)
  //   ]),
  //   name: new FormControl<string | null>('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(64)
  //   ]),
  //   password: new FormControl<string | null>('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //     Validators.maxLength(50)
  //   ]),
  // })
  //
  // register() {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched()
  //     return console.log('invalid register form');
  //   }
  //
  //   const {login, name, password} = this.form.value;
  //
  //   if (login && name && password) {
  //     console.log(this.form.value);
  //     this.registerService.getRegister({ login, name, password })
  //       .subscribe({
  //         next: (res) => {
  //           console.log(res);
  //           this.closeShowPopupRegister.emit(false);
  //         },
  //         error: (error) => {
  //           console.log('Ошибка регистрации', error);
  //         }
  //     })
  //   }
  // }
  //
  // get nameControl() {
  //   return this.form.controls.name as FormControl;
  // }
}
