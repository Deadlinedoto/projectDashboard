import { Component } from '@angular/core';
import {PostComponent} from '../../shared/components/post/post.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
