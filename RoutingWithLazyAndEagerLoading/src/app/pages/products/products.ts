import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true, // Standalone component (no NgModule)
  templateUrl: './products.html', // External template for the Products page
})
export class Products {
  // Inject ProductService to access the in-memory product list on this page
  // public = can be used directly inside products.html (productService.products)
  constructor(public productService: ProductService) {}

  // Helper method: returns the final discounted price for a given product id
  // Used when the template only has productId and not the full product object
  finalPrice(id: number): number {
    // Find the product by id from the in-memory list
    const p = this.productService.products.find((x) => x.id === id);

    // If product exists, return discounted selling price, otherwise return 0
    return p ? this.productService.getFinalPrice(p) : 0;
  }
}
