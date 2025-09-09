import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductMiniCardComponent} from './components/product-mini-card/product-mini-card.component';
import {ApiService} from '../../core/services/http/api.service';

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
