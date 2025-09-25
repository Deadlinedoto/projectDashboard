import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowPhoneDialogService {
  showPhoneDialog = signal<boolean>(false)

  openPhoneDialog() {
    this.showPhoneDialog.set(true)
  }
  closePhoneDialog() {
    this.showPhoneDialog.set(false)
  }
}
