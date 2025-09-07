import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    Button,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = ''
  @Input() icon: string = ''
  @Input() loading: boolean = false
  @Input() disabled: boolean = false
  @Input() customClass: string = ''



  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.onClick.emit(event)
  }

  get buttonClass(): string {
    return `app-button ${this.customClass}`;
  }

}
