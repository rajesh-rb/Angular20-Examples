import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true, // Standalone component (no NgModule needed)
  imports: [RouterLink], // Needed because home.html uses [routerLink]
  templateUrl: './home.html', // External template file
})
export class Home {
  // Inject ProductService so the Home page can display products (in-memory list)
  // public = accessible directly in home.html (example: productService.products)
  constructor(public productService: ProductService) {}
}
