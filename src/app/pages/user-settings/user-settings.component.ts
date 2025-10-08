import {Component, computed, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../core/services';
import {UserInterface} from '../../core/interfaces/user-interface';
import {ApiService} from '../../core/services/http/api.service';
import {Observable} from 'rxjs';
import {RegisterInterface} from '../../features/auth/components/register/register.interface';

@Component({
  selector: 'app-user-settings',
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {
  apiService = inject(ApiService);
  public userData?: UserInterface
  private fb = inject(FormBuilder)

  form = this.fb.group({
    Name: [''],
    Login: [''],
    Address: [''],
  })

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe({
      next: (response) => {
        this.userData = response;
        console.log(response);
        this.form.patchValue({
          Name: response.name,
          Login: response.login
        })
      }
    })
  }
  changeProfile() {
    console.log(this.userData?.id)
    this.apiService.putChangeProfile(this.userData?.id! + this.form.value).subscribe({

    })
  }
}
