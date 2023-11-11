import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  constructor(public cartService: CartService) {
  }

  isCountZero: boolean | undefined;
  haveSigned: boolean | undefined;
  count: number = 0;

  ngOnInit(): void {
    this.cartService.updateCartCount();

    this.cartService.cartCount$.subscribe((length) => {
      this.isCountZero = length === 0;
    });

    // this.cartService.getCartCount();
  }
  

}