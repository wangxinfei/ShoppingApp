import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    const product_list = of(products);
    return product_list;
  }
}
