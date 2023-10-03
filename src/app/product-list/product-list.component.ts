import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy{
  private productSubscription!: Subscription;
  constructor(public productService: ProductService) {}
  
  products: Product[] = [];
  selectedProduct?: Product;

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  // getProducts(): void {
  //   this.productService.getProducts()
  //       .subscribe(products => this.products = products);
  // }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
