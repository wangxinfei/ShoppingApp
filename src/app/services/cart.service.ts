import { Injectable } from '@angular/core';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = []

  add(product: Product) {
    this.items.push(product);
  }

  clear() {
    this.items = [];
  }
  // constructor() { }
}
