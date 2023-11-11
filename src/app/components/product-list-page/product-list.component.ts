import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  selectedProduct?: Product;

  constructor(public productService: ProductService) {}
  

  ngOnInit() {
    this.productService.getProductList().subscribe((data) => {
      console.log(data)
      this.products = data;
    });
    this.productService.startProductCreation();
    this.productService.products$.subscribe((data) => {
      this.products = data;
    });
  }


  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

}