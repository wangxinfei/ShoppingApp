import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval, timeout, Subscribable, Subscription } from 'rxjs';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly productSubject = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Phone XL',
      price: 799,
      description: 'A large phone with one of the best screens'
    },
    {
      id: 2,
      name: 'Phone Mini',
      price: 699,
      description: 'A great phone with one of the best cameras'
    },
    {
      id: 3,
      name: 'Phone Standard',
      price: 299,
      description: ''
    }
  ] as Product[]);

  intervalSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.intervalSubscription =interval(3000)
    // .pipe
    .subscribe(() => {
      const currentList = this.productSubject.getValue();
      const newProduct = this.generateProduct(currentList.length+1);
      currentList.push(newProduct);
      this.productSubject.next(currentList);
    })

    setTimeout(() => {
      this.stopInterval();
    }, 30000);
  }

  private generateProduct(id: number): Product {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let name = '';
    const stringLength = 8;
    const randomPrice = Math.round(Math.random() * 1000);
    for (let i = 0; i < stringLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      name += characters.charAt(randomIndex);
    }
    return {
      id: id,
      name: name,
      price: randomPrice,
      description: ''
    };
  }

  private stopInterval() {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      this.intervalSubscription.unsubscribe();
    }
  }

  findProduct(productIdFromRoute: number): Product | undefined {
    return this.productSubject.value.find((product: Product) => { return product.id === productIdFromRoute });
  }

  getProducts(): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  
}
