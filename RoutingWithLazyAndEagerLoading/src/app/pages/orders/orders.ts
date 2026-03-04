import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OrderService, Order } from '../../services/order.service';

@Component({
  standalone: true,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders: Order[] = [];

  constructor(
    public auth: AuthService,
    private orderService: OrderService,
  ) {
    const user = this.auth.currentUser;
    this.orders = user ? this.orderService.getOrdersByUser(user.id) : [];
  }
}
