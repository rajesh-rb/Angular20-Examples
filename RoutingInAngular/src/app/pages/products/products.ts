import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type Product = {
  id: number;
  name: string;
  price: number;
  brand: string;
  mrp: number;
  rating: number;
  stock: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  category: 'electronics' | 'accessories' | 'wfh' | 'new';
  badge?: 'Bestseller' | 'New' | 'Top Rated';
};

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  // This value is driven by the query string:
  // Example URL: /products?category=electronics
  // category = "electronics"
  category = '';

  search = '';

  products: Product[] = [
    {
      id: 101,
      name: 'Mechanical Keyboard',
      brand: 'KeyPro',
      price: 2499,
      mrp: 2999,
      rating: 4.6,
      stock: 'In Stock',
      category: 'electronics',
      badge: 'Bestseller',
    },
    {
      id: 102,
      name: 'Wireless Mouse',
      brand: 'SwiftTech',
      price: 999,
      mrp: 1299,
      rating: 4.4,
      stock: 'Limited Stock',
      category: 'electronics',
      badge: 'Top Rated',
    },
    {
      id: 103,
      name: '27-inch Monitor',
      brand: 'ViewMax',
      price: 12999,
      mrp: 14999,
      rating: 4.5,
      stock: 'In Stock',
      category: 'electronics',
    },
    {
      id: 104,
      name: 'USB-C Hub (6-in-1)',
      brand: 'Portify',
      price: 1499,
      mrp: 1999,
      rating: 4.2,
      stock: 'In Stock',
      category: 'accessories',
      badge: 'New',
    },
    {
      id: 105,
      name: 'Ergonomic Chair Cushion',
      brand: 'ComfortCo',
      price: 1199,
      mrp: 1599,
      rating: 4.3,
      stock: 'In Stock',
      category: 'wfh',
    },
    {
      id: 106,
      name: 'Fast Charger 65W',
      brand: 'VoltOne',
      price: 1799,
      mrp: 2199,
      rating: 4.4,
      stock: 'Out of Stock',
      category: 'accessories',
    },
    {
      id: 107,
      name: 'Laptop Stand (Aluminium)',
      brand: 'LiftDesk',
      price: 1299,
      mrp: 1699,
      rating: 4.1,
      stock: 'In Stock',
      category: 'wfh',
      badge: 'Bestseller',
    },
    {
      id: 108,
      name: 'Braided USB-C Cable',
      brand: 'CableX',
      price: 399,
      mrp: 599,
      rating: 4.0,
      stock: 'In Stock',
      category: 'new',
      badge: 'New',
    },
  ];

  filtered: Product[] = [];

  // Routing-related injections:
  // ActivatedRoute -> read information FROM the current URL (here: query string)
  // Router         -> navigate / update the URL programmatically from code
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      debugger;
      this.category = params.get('category') ?? '';
      this.applyFilters();
    });

    this.applyFilters();
  }

  setCategory(category: string) {
    // Programmatic navigation + query params
    // Updates the URL to /products?category=<value>
    // This does NOT reload the page; it only changes the URL and triggers queryParamMap subscription.
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  clearCategory() {
    // Programmatic navigation (remove query string)
    // Updates URL back to /products (no query params).
    this.router.navigate(['/products']);
  }

  onSearchChange(value: string) {
    this.search = value;
    this.applyFilters();
  }

  private applyFilters() {
    const cat = this.category.trim().toLowerCase();
    const q = this.search.trim().toLowerCase();

    this.filtered = this.products.filter((p) => {
      const matchesCategory = !cat || p.category === cat;
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }

  discountPercent(mrp: number, price: number) {
    return Math.round(((mrp - price) / mrp) * 100);
  }
}
