import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductMiniCardComponent} from './components/product-mini-card/product-mini-card.component';
import {ApiService} from '../../core/services/http/api.service';
import {AuthStateService} from '../../features/auth/components/auth/services';

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

  authStateService = inject(AuthStateService);
  apiService = inject(ApiService);

  products: any[] = [];

  ngOnInit() {
    this.authStateService.setPageLoading(true);
    this.apiService.getAllProducts()
      .subscribe({
          next: (value) => {
            console.log(value);
            this.products = value;
          }
        }
      )

  }
}
