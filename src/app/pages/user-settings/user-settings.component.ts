import {Component, computed, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../shared/components/ui/button';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../core/services';
import {UserInterface} from '../../core/interfaces/user-interface';

@Component({
  selector: 'app-user-settings',
  imports: [
    ButtonComponent
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {
  userService = inject(UserService);


  ngOnInit() {
    console.log(this.userService.userData()?.userName);


  }


  formInfo = new FormGroup({

  })
}
