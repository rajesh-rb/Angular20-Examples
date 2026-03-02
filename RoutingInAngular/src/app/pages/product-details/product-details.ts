import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type ProductInfo = {
  id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  inStock: boolean;
  shortDescription: string;
  highlights: string[];
  specs: { label: string; value: string }[];
};

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  // This "id" comes from the route parameter in the URL:
  // Route pattern: /products/:id
  // Example URL:   /products/101  --> id = 101
  id: number | null = null;

  product: ProductInfo | null = null;

  private catalog: ProductInfo[] = [
    {
      id: 101,
      brand: 'KeyPro',
      name: 'Mechanical Keyboard',
      price: 2499,
      mrp: 2999,
      rating: 4.6,
      inStock: true,
      shortDescription: 'Tactile, durable, and comfortable for daily work and gaming.',
      highlights: ['Hot-swappable switches', 'Compact layout', 'Durable keycaps'],
      specs: [
        { label: 'Connectivity', value: 'Wired USB' },
        { label: 'Switch Type', value: 'Tactile' },
        { label: 'Warranty', value: '12 Months' },
      ],
    },
    {
      id: 102,
      brand: 'SwiftTech',
      name: 'Wireless Mouse',
      price: 999,
      mrp: 1299,
      rating: 4.4,
      inStock: true,
      shortDescription: 'Lightweight ergonomic mouse with smooth tracking.',
      highlights: ['Ergonomic grip', 'Precision sensor', 'Battery efficient'],
      specs: [
        { label: 'Connectivity', value: '2.4GHz Wireless' },
        { label: 'Battery', value: 'Up to 12 months' },
        { label: 'Warranty', value: '12 Months' },
      ],
    },
    {
      id: 103,
      brand: 'ViewMax',
      name: '27-inch Monitor',
      price: 12999,
      mrp: 14999,
      rating: 4.5,
      inStock: false,
      shortDescription: 'Large screen for productivity and entertainment.',
      highlights: ['Large display', 'Sharp visuals', 'Multi-task friendly'],
      specs: [
        { label: 'Size', value: '27-inch' },
        { label: 'Resolution', value: 'Full HD (Demo)' },
        { label: 'Warranty', value: '24 Months' },
      ],
    },
  ];

  // ActivatedRoute -> used to READ data from the current route (route param :id, query params, etc.)
  // Router         -> used to NAVIGATE programmatically from code
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // Reading the route parameter (:id)
    // This subscribes to paramMap so it will also work if the user navigates from
    // /products/101 to /products/102 while staying on the same component instance.
    //
    // Route table link:
    // { path: 'products/:id', component: ProductDetails }
    this.route.paramMap.subscribe((pm) => {
      const value = pm.get('id'); // reads ":id" from /products/:id
      this.id = value ? Number(value) : null;

      // Use the route param to decide which product to show
      this.product = this.catalog.find((x) => x.id === this.id) ?? null;
    });
  }

  backToProducts() {
    // Programmatic navigation
    // Navigates back to the products list route (path: 'products') without reloading the page.
    this.router.navigate(['/products']);
  }

  discountPercent(mrp: number, price: number) {
    // Not routing-related: calculation helper.
    return Math.round(((mrp - price) / mrp) * 100);
  }
}
