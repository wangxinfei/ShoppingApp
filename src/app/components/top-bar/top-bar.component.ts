import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  constructor(public cartService: CartService) {
  }

  get cartDisabled(): boolean {
    return this.cartService.items.length === 0;
  }
  
  getDynamicRoute(): string {
    return this.cartDisabled ? '/dashboard' : '/cart';
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/