import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  
  constructor(public cartService: CartService) {}

  cart: Product[] = [];

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): Subscription {
    return this.cartService.getCart()
        .subscribe(products => this.cart = products);
  }

  clearCart(): void {
    this.cartService.clear();
    this.getCart();
  }


}
