import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Checkbox} from 'primeng/checkbox';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {AuthService} from './services';

@Component({
  selector: 'app-auth',
  imports: [
    Dialog,
    Checkbox,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true,
})
export class AuthComponent {
  @Input() visible = false;
  @Output() closeShowPopupLogin = new EventEmitter();

  authService = inject(AuthService)

  rememberMe: boolean = false;


  form = new FormGroup({
    login: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  })



  onHide(): void {
    this.closeShowPopupLogin.emit(false);
  }

  onSubmit() {
    console.log("Форма отправлена")
    if (this.form.valid) {
      console.log(this.form.value);
      //@ts-ignore
      this.authService.login(this.form.value)
        .subscribe(res => {
        console.log(res);
        this.onHide()
      })
    }
  }
}
