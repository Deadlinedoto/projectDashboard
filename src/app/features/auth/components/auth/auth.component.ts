import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Checkbox} from 'primeng/checkbox';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from '../../../../shared/components/ui/button/button.component';

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
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  @Input() visible: boolean = false;
  @Output() closeShowPopupLogin = new EventEmitter();

  rememberMe: boolean = false;

  onHide(): void {
    this.visible = false;
    this.closeShowPopupLogin.emit(this.visible);
  }

  form = new FormGroup({
    login: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  })

  onSubmit() {
    console.log("Форма отпрвалена")
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
