import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
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
  

  constructor(private http: HttpClient) {

  }

  getProductList() {
    return this.http.get<Product[]>(`${this.apiUrl}/products/all`)
  }

  getProductCount() {
    return this.http.get<number>(`${this.apiUrl}/products/count`)
  }


  getProduct(id: number): Product | void {
    this.http.get<Product>(`${this.apiUrl}/products/${id.toString()}`).subscribe((data) => {
      return data;
    })
  }

  startProductCreation() {
    const subscription: Subscription = interval(3000).subscribe(async () => {
      this.getProductCount().subscribe((count) => {
        if (count < 10) {
          this.generateProduct(count).subscribe(() => {
            this.updateProductList();
          })
        }
      })
    });
  }

  generateProduct(id: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let name = '';
    const stringLength = 8;
    const randomPrice = Math.round(Math.random() * 1000);
    for (let i = 0; i < stringLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      name += characters.charAt(randomIndex);
    }
    let newProduct = {
      id: id,
      name: name,
      price: randomPrice,
      description: ''
    }
  
    return this.http.post(`${this.apiUrl}/products/new`, newProduct);
  }

  updateProductList() {
    this.getProductList().subscribe((data) => {
      return this.productListSubject.next(data);
    });
  }
  
}

