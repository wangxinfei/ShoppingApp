import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  private cartSubscription!: Subscription;
  
  constructor(public cartService: CartService) {}

  cart: Product[] = [];

  ngOnInit(): void {
    this.cartSubscription = this.getCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getCart(): Subscription {
    return this.cartService.getItems()
        .subscribe(products => this.cart = products);
  }

  clearCart(): void {
    this.cartService.clear();
    this.getCart();
  }


}
