import { Injectable } from '@angular/core';

// Each item inside an order (simple in-memory structure)
export type OrderItem = { productName: string; qty: number; unitPrice: number };

// Order model used by Orders page + Order Details modal
export type Order = {
  orderId: string;
  userId: number; // helps filter orders per logged-in user
  orderDate: string; // yyyy-mm-dd
  status: 'Placed' | 'Shipped' | 'Delivered';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  items: OrderItem[];
  shippingAddress: string;
  expectedDelivery: string; // yyyy-mm-dd
  subtotal: number; // sum of items (before discount/tax)
  discount: number; // saved amount
  tax: number; // tax amount
  totalAmount: number; // final payable amount
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  // In-memory orders (no DB/API) for demo application
  private orders: Order[] = [
    {
      orderId: 'ORD-1001',
      userId: 101,
      orderDate: '2026-02-01',
      status: 'Delivered',
      paymentMethod: 'UPI',
      items: [
        { productName: 'Wireless Mouse', qty: 1, unitPrice: 599 },
        { productName: 'USB-C Hub (7-in-1)', qty: 1, unitPrice: 999 },
      ],
      shippingAddress: 'Saheed Nagar, Bhubaneswar, Odisha - 751007',
      expectedDelivery: '2026-02-04',
      subtotal: 1598,
      discount: 100,
      tax: 400,
      totalAmount: 1898,
    },
    {
      orderId: 'ORD-1002',
      userId: 101,
      orderDate: '2026-02-08',
      status: 'Shipped',
      paymentMethod: 'Card',
      items: [{ productName: 'Laptop Stand (Aluminum)', qty: 1, unitPrice: 1299 }],
      shippingAddress: 'Saheed Nagar, Bhubaneswar, Odisha - 751007',
      expectedDelivery: '2026-02-12',
      subtotal: 1299,
      discount: 200,
      tax: -100,
      totalAmount: 999,
    },
    {
      orderId: 'ORD-1003',
      userId: 101,
      orderDate: '2026-02-14',
      status: 'Placed',
      paymentMethod: 'NetBanking',
      items: [{ productName: 'External SSD (1TB)', qty: 1, unitPrice: 8999 }],
      shippingAddress: 'Saheed Nagar, Bhubaneswar, Odisha - 751007',
      expectedDelivery: '2026-02-18',
      subtotal: 8999,
      discount: 800,
      tax: 600,
      totalAmount: 8799,
    },
    {
      orderId: 'ORD-1004',
      userId: 101,
      orderDate: '2026-02-16',
      status: 'Delivered',
      paymentMethod: 'UPI',
      items: [
        { productName: 'Noise Cancelling Headphones', qty: 1, unitPrice: 5499 },
        { productName: 'Webcam (1080p)', qty: 1, unitPrice: 2199 },
      ],
      shippingAddress: 'Saheed Nagar, Bhubaneswar, Odisha - 751007',
      expectedDelivery: '2026-02-19',
      subtotal: 7698,
      discount: 700,
      tax: 500,
      totalAmount: 7498,
    },
  ];

  // Returns only orders of a specific user (used in Orders page)
  getOrdersByUser(userId: number): Order[] {
    return this.orders.filter((o) => o.userId === userId);
  }
}
