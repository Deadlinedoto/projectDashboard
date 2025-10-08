import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Checkbox} from 'primeng/checkbox';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/components/ui/button';
import {AuthService} from './services';
import {NgxMaskDirective} from 'ngx-mask';

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
  @Input() visible = false;
  @Output() closeShowPopupLogin = new EventEmitter();

  authService = inject(AuthService)
  private _fb = inject(FormBuilder)
  authForm: FormGroup;

  rememberMe: boolean = false;


  constructor() {
    this.authForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }




  onHide(): void {
    this.closeShowPopupLogin.emit(false);
  }

  onSubmit() {
    console.log("Форма отправлена")
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      //@ts-ignore
      this.authService.login(this.authForm.value)
        .subscribe(res => {
        console.log(res);
        this.onHide()
      })
      this.authForm.reset()
    }
  }
}
