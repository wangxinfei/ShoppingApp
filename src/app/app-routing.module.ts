import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list-page/product-list.component'
import { ProductDetailsComponent } from './components/product-details-page/product-details.component';
import { CartComponent } from './components/cart-page/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}