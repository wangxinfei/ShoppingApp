import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent {
  count!: number | void;
  constructor(public cartService: CartService) {
  }

  @Input()
  product!: Product;

  ngOnInit() {
    this.count = this.getCountID();
  }

  getCountID(): number {
    return this.cartService.getCountID();
  }

  incrementCount() {
    this.cartService.add(this.product);
    this.count = this.getCountID();
    console.log(this.count);
    // this.cartService.cart$.subscribe((data) => {
      
    // });
  }

  decrementCount() {
    if (this.count && this.count > 0) {
      this.cartService.remove(this.product);
      this.count = this.getCountID();
      console.log(this.count);
      // this.cartService.cart$.subscribe((data) => {
      //   this.count = this.getCountID();
      // });
    }
  }

}
