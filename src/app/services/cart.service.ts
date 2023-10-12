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
  cart$ = this.cartSubject.asObservable();
  cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  apiUrl = 'http://localhost:3000'

  constructor(public productService: ProductService, private http: HttpClient) { }


  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart/all`);
  }

  getCartCount() {
    return this.http.get<number>(`${this.apiUrl}/cart/count`).subscribe((count) => {
      this.cartCountSubject.next(count);
    })
  }

  getItemCount(id: number) {
    return this.http.get<number>(`${this.apiUrl}/cart/count/${id}`);
  }

  update(): Product[] | void {
    this.getCart().subscribe((data) => {
      return this.cartSubject.next(data);
    });
  }

  add(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/cart/add`, product).subscribe(() => {
        this.update();
        resolve();
      })
    });
  }

  remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/cart/delete/${id}`).subscribe(() => {
        this.update();
        resolve();
      })
    });
    
  }

  clear() {
    this.http.get(`${this.apiUrl}/cart/clear`).subscribe(() => {
      return this.update();
    })
  }
}
