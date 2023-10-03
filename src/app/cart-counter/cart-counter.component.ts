import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../products';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent {
  @Input() product: Product | undefined;
  
  constructor(public cartService: CartService) {
    
  }

  count = 0;

  incrementCount() {
    this.count++;
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
    }
  }

}
