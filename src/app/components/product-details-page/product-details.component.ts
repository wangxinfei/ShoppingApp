import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }
  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
  
    // Find the product that correspond with the id provided in route.
    this.product = this.productService.findProduct(productIdFromRoute);
    if (!this.product) {
      // go back to dashboard page
    }
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified whtn the product goes on sale');
  }
}
