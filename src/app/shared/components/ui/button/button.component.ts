import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [
    Button,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = ''
  @Input() icon: string = ''
  @Input() customClass: string = ''
  @Input() loading: boolean = false
  @Input() disabled: boolean = false



  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.onClick.emit(event)
  }

}
