import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {Dialog} from 'primeng/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {RegisterService} from './register.service';
import {AuthStateService} from '../auth/services';
import {Message} from 'primeng/message';
import {NgxMaskDirective} from 'ngx-mask';
import {LoadingModalService} from '../../../loading-modal/loading-modal/services/loading-modal.service';
import {MessageService} from 'primeng/api';


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
  private messageService = inject(MessageService)
  isLoading = this.authStateService.isLoading;
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  _fb = inject(FormBuilder)

  onHide() {
    this.closeShowPopupRegister.emit(false);
  }

  formRegister: FormGroup;

  constructor() {
    this.formRegister = this._fb.group({
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
      confirmPassword: ['', [
        Validators.required
      ]]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  register() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      console.log('Форма невалидна');
      return;
    }
    const {confirmPassword, ...registerData} = this.formRegister.value;

    this.registerService.getRegister(registerData).subscribe({
      next: (res) => {
        console.log(res)
        console.log("Отправленные данные: ", registerData)
        this.closeShowPopupRegister.emit(false);
        this.formRegister.reset()
        this.messageService.add({severity: 'info', summary: 'Успешно', detail: 'Профиль успешно обновлен'});
      },
      error: (error) => {
        console.error("Ошибка регистрации", error)
      }
    })
  }
}
