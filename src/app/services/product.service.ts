import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  intervalSubscription: Subscription = new Subscription;
  productListSubject = new BehaviorSubject<Product[]>([]);
  products$  = this.productListSubject.asObservable();
  apiUrl = 'http://localhost:3000'
  apiUrl1 = 'http://localhost:8080'
  

  constructor(private http: HttpClient) {

  }

  getProductList() {
    return this.http.get<Product[]>(`${this.apiUrl1}/products/all`)
  }

  getProductCount() {
    return this.http.get<number>(`${this.apiUrl1}/products/count`)
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl1}/products/detail/${id.toString()}`);
  }

  startProductCreation() {
    const subscription: Subscription = interval(3000).subscribe(async () => {
      this.getProductCount().subscribe((count) => {
        if (count < 10) {
          this.generateProduct().subscribe(() => {
            this.updateProductList();
          })
        }
      })
    });
  }

  generateProduct() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let name = '';
    const stringLength = 8;
    const randomPrice = Math.round(Math.random() * 1000);
    for (let i = 0; i < stringLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      name += characters.charAt(randomIndex);
    }
    let newProduct = {
      id: -1,
      name: name,
      price: randomPrice,
      description: ''
    }
  
    return this.http.post(`${this.apiUrl1}/products/new`, newProduct);
  }

  updateProductList() {
    this.getProductList().subscribe((data) => {
      return this.productListSubject.next(data);
    });
  }
  
}

