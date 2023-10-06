import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent {
  constructor(public cartService: CartService) {
  }

  @Input()
  product!: Product;

  count = 0;

  getCountID() {
    return this.cartService.items.filter((item) => item.id == this.product.id).length;
  }

  incrementCount() {
    this.count++;
    this.cartService.add(this.product);
  }

  decrementCount() {
    if (this.count > 0 || this.getCountID() > 0) {
      this.count--;
      this.cartService.remove(this.product);
    }
  }

}
