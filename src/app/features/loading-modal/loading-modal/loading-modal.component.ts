import {Component, inject} from '@angular/core';
import {BlockUI} from 'primeng/blockui';
import {ProgressSpinner} from 'primeng/progressspinner';
import {LoadingModalService} from './services/loading-modal.service';

@Component({
  selector: 'app-loading-modal',
  imports: [
    BlockUI,
    ProgressSpinner
  ],
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.scss',
  standalone: true,
})
export class LoadingModalComponent {
    loadingModalService = inject(LoadingModalService);

    get isLoading() {
      return this.loadingModalService.isLoading();
    }
    get loadingMessage() {
      return this.loadingModalService.loadingMessage();
    }
}
