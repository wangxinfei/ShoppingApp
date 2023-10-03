import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}
  cart: Product[] = [];

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getItems()
        .subscribe(products => this.cart = products);
  }

  clearCart(): void {
    this.cartService.clear();
    this.getCart();
  }

}
