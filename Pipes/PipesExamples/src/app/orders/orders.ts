import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  order: Order = {
    orderId: 'ORD-2026-2049',
    orderDate: new Date('2026-02-01T15:35:00'),
    status: 'Shipped',

    customer: { customerId: 101, fullName: 'pranaya rout', email: 'pranaya@example.com', mobile: '+91 98765 43210', isPremium: true },

    deliveryAddress: { line1: 'Plot 12, Jayadev Vihar', line2: 'Near Main Road', city: 'Bhubaneswar', state: 'Odisha', pincode: '751013' },

    payment: { method: 'UPI', transactionId: 'UPI-9F2A1XK81', paidOn: new Date('2026-02-01T10:36:00'), paymentStatus: 'Paid' },

    items: [
      { sku: 'KB-1021', productName: 'mechanical keyboard', unitPrice: 3499.5, quantity: 1, discountPercent: 10, gstPercent: 18, lineTotal: 3716.47 },
      { sku: 'MS-3090', productName: 'wireless mouse', unitPrice: 899, quantity: 2, discountPercent: 5, gstPercent: 18, lineTotal: 2016.06 },
      { sku: 'HB-2201', productName: 'usb hub', unitPrice: 649, quantity: 1, discountPercent: 0, gstPercent: 18, lineTotal: 765.82 }
    ],

    totals: {
      subTotalTaxable: 5506.65,
      totalGst: 991.20,
      grandTotal: 6497.85
    }
  };


  getTotalItems(order: Order): number {
    let total = 0;
    // Go through every item in the order
    for (const item of order.items) {
      total += item.quantity; // add current item's quantity to total
    }

    return total;
  }

  getStatusBadgeClass(status: Order['status']): string {
    switch (status) {
      case 'Delivered': return 'bg-success';          // green → completed
      case 'Shipped': return 'bg-primary';            // blue → in transit
      case 'Packed': return 'bg-warning text-dark';   // yellow → ready, warning tone
      case 'Placed': return 'bg-info text-dark';      // light blue → newly created
      case 'Cancelled': return 'bg-danger';           // red → cancelled
      default: return 'bg-secondary';                 // grey → unknown/other
    }
  }

  getPaymentBadgeClass(status: Order['payment']['paymentStatus']): string {
    switch (status) {
      case 'Paid': return 'bg-success';               // green → success
      case 'Pending': return 'bg-warning text-dark';  // yellow → waiting
      case 'Failed': return 'bg-danger';              // red → failure
      default: return 'bg-secondary';                 // grey → unknown/other
    }
  }


}
