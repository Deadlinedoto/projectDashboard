import { Component } from '@angular/core';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-big',
  imports: [
    Skeleton
  ],
  templateUrl: './skeleton-big.component.html',
  styleUrl: './skeleton-big.component.scss',
  standalone: true
})
export class SkeletonBigComponent {

}
