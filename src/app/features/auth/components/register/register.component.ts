import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ButtonComponent} from '../../../../shared/components/ui/button/button.component';
import {Dialog} from 'primeng/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from '../../../../core/services/register/register.service';

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    Dialog,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() visible = false;
  @Output() closeShowPopupRegister = new EventEmitter()

  registerService = inject(RegisterService)

  onHide() {
    this.closeShowPopupRegister.emit(this.visible);
  }

  form = new FormGroup({
    login: new FormControl<string | null>(null, Validators.required),
    name: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })
  onSubmit() {
    if(this.form.valid) {
      const {login, name, password} = this.form.value;
      if(login && name && password) {
        console.log(this.form.value);
        this.registerService.getRegister({
          login, name, password
          }).subscribe(res => {console.log(res)})
      }
    }
  }
  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     //@ts-ignore
  //     this.registerService.getRegister(this.form.value)
  //       .subscribe(res => {
  //         console.log(res);
  //       })
  //   }
  // }
}
