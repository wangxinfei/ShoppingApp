import { Injectable } from '@angular/core';
import { Product } from '../products';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(public productService: ProductService) {}
  items: Product[] = [];

  // getItems() : Observable<Product[]> {
  //   const cart_list = of(this.items);
  //   return cart_list;
  // }

  add(product: Product) {
    this.items.push(product);
  }

  remove(product: Product) {
    let index = this.items.indexOf(product);
    this.items.splice(index,1);
  }

  clear() {
    this.items = [];
  }
}
