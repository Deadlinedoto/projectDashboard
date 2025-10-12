import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingModalService {
  isLoading = signal<boolean>(false);
  loadingMessage = signal<string>('Пожалуйста, подождите');


  showLoadingModal(message?: string): void {
    if (message) {
      this.loadingMessage.set(message);
    }
    this.isLoading.set(true)
  }
  hideLoadingModal() {
    this.isLoading.set(false)
    this.loadingMessage.set('Пожалуйста, подождите')
  }
}
