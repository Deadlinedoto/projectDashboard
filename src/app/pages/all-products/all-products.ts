import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductComponent} from '../../shared/components/product/product.component';
import {ApiService} from '../../core/services/http/api.service';

@Component({
  selector: 'app-all-products',
  imports: [
    NgForOf,
    RouterLink,
    ProductComponent,
  ],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss'
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
