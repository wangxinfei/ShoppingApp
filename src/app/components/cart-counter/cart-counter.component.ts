import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';
import { error } from 'console';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent {
  count!: number | undefined;
  constructor(public cartService: CartService) {
  }

  @Input()
  product!: Product;

  ngOnInit() {
    this.getCount();
  }

  getCount() {
    if (this.product) {
      this.cartService.getItemCount(this.product.id).subscribe((data) => {
        this.count = data;
      })
    } else {
      this.count = 0;
    }
    
  }

  async incrementCount() {
    try {
      await this.cartService.add(this.product);
      this.getCount();
    } catch {
      console.log('add failed');
    }
  }

  async decrementCount() {
    try {
      if (this.count && this.count > 0) {
        await this.cartService.remove(this.product.id);
        this.getCount();
      }
    } catch (error) {
        console.log(error);
        console.log('delete failed');
      }
    }
    
}

