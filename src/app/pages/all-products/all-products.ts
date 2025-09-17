import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductMiniCardComponent} from './components/product-mini-card/product-mini-card.component';
import {ApiService} from '../../core/services/http/api.service';
import {ImageService} from '../../core/services/image.service';
import {UserInterface} from '../../core/interfaces/user-interface';
import {UserService} from '../../core/services';

@Component({
  selector: 'app-all-products',
  imports: [
    NgForOf,
    RouterLink,
    ProductMiniCardComponent,
  ],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
  standalone: true,
})

export class AllProductsComponent implements OnInit {

  userService = inject(UserService);
  products: any[] = [];

 constructor(private apiService: ApiService) {
 }
 ngOnInit() {
   this.apiService.getAllProducts()
     .subscribe({
       next: (value) => {
        console.log(value);
        this.products = value;
   }})
 }
}
