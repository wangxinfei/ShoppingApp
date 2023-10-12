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

  ngOnInit(): void {
    this.cartService.cart$.subscribe((data) => {
      this.isCountZero = data.length === 0;
    });
  }
  

}