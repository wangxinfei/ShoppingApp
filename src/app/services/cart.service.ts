import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { ProductService } from './product.service';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  intervalSubscription: Subscription = new Subscription;
  cartSubject = new BehaviorSubject<Product[]>([]);
  cartItemCount = new BehaviorSubject<number>(0);
  cart$ = this.cartSubject.asObservable();
  apiUrl = 'http://localhost:3000'

  constructor(public productService: ProductService, private http: HttpClient) { }


  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart/all`);
  }

  // Update the count when the cart changes
  updateCartCount(id: number) {
    const result = this.cartSubject.value.filter((item) => item.id === id).length;
    console.log(this.cartSubject.value);
    this.cartItemCount.next(result);
  }

  // Now, you can call this function to get the count
  getCountID(): number {
    return this.cartItemCount.value;
  }

  update(): Product[] | void {
    this.getItems().subscribe((data) => {
      //this.updateCartCount();
      return this.cartSubject.next(data);
    });
  }

  add(product: Product) {
    this.http.post(`${this.apiUrl}/cart/add`, product).subscribe(() => {
      return this.update();
    })
  }

  remove(product: object) {
    this.http.delete(`${this.apiUrl}/cart/delete`, product).subscribe(() => {
      console.log(product);
      // this.updateCartCount(product);
      return this.update();
    })
  }

  clear() {
    this.http.get(`${this.apiUrl}/cart/clear`).subscribe(() => {
      return this.update();
    })
  }
}
