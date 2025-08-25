import { Component } from '@angular/core';
import {PostComponent} from '../../shared/components/post/post.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-all-ads',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './all-ads.html',
  styleUrl: './all-ads.scss'
})
export class AllAds {

}
