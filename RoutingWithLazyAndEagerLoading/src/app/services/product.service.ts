import { Injectable } from '@angular/core';

// Product contract used across UI (Products + Home featured list)
export type Product = {
  id: number;
  name: string;
  price: number; // MRP / original price
  category: string;
  brand: string;
  rating: number; // 0 - 5
  reviews: number; // total reviews count
  stock: number; // available quantity
  discountPercent: number; // discount in %
  imageUrl: string; // product image link
  shortDesc: string; // quick description shown on card
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  // In-memory product list (no API / DB) used for demo app
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 799,
      category: 'Accessories',
      brand: 'LogiPro',
      rating: 4.5,
      reviews: 1842,
      stock: 38,
      discountPercent: 25,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
      shortDesc: 'Ergonomic design with silent clicks and long battery life.',
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      price: 2999,
      category: 'Accessories',
      brand: 'KeyNova',
      rating: 4.6,
      reviews: 968,
      stock: 15,
      discountPercent: 20,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      shortDesc: 'Tactile switches, RGB backlight, and sturdy metal frame.',
    },
    {
      id: 3,
      name: 'USB-C Hub (7-in-1)',
      price: 1499,
      category: 'Utility',
      brand: 'PortMate',
      rating: 4.3,
      reviews: 1120,
      stock: 52,
      discountPercent: 10,
      imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6',
      shortDesc: 'HDMI + USB 3.0 + SD reader + PD charging support.',
    },
    {
      id: 4,
      name: '27-inch IPS Monitor',
      price: 15999,
      category: 'Displays',
      brand: 'ViewMax',
      rating: 4.4,
      reviews: 640,
      stock: 9,
      discountPercent: 18,
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
      shortDesc: 'Sharp colors, thin bezels, and eye-care mode for long sessions.',
    },
    {
      id: 5,
      name: 'Noise Cancelling Headphones',
      price: 5499,
      category: 'Audio',
      brand: 'SoundArc',
      rating: 4.5,
      reviews: 723,
      stock: 21,
      discountPercent: 22,
      imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
      shortDesc: 'Active noise cancellation with deep bass and clear vocals.',
    },
    {
      id: 6,
      name: 'Webcam (1080p)',
      price: 2199,
      category: 'Work From Home',
      brand: 'CamSwift',
      rating: 4.2,
      reviews: 510,
      stock: 30,
      discountPercent: 15,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',
      shortDesc: 'Crisp video, built-in mic, and plug-and-play setup.',
    },
    {
      id: 7,
      name: 'External SSD (1TB)',
      price: 8999,
      category: 'Storage',
      brand: 'FlashX',
      rating: 4.7,
      reviews: 1460,
      stock: 14,
      discountPercent: 12,
      imageUrl: 'https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg',
      shortDesc: 'Fast transfers, durable build, and compact pocket size.',
    },
    {
      id: 8,
      name: 'Laptop Stand (Aluminum)',
      price: 1299,
      category: 'Ergonomics',
      brand: 'ErgoLift',
      rating: 4.4,
      reviews: 390,
      stock: 60,
      discountPercent: 8,
      imageUrl: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17',
      shortDesc: 'Improves posture and airflow with adjustable angles.',
    },
  ];

  // Returns the selling price after applying discountPercent
  getFinalPrice(p: Product): number {
    const discount = (p.price * p.discountPercent) / 100;
    return Math.round(p.price - discount);
  }
}
