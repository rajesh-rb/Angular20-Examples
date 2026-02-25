export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Customer {
    customerId: number;
    email: string;
    fullName: string;
    mobile: string;
    isPremium: boolean;
}

export interface PaymentInfo {
    method: 'UPI' | 'CARD' | 'NetBanking' | 'COD';
    transactionId?: string;
    paidOn?: Date;
    paymentStatus: 'Paid' | 'Pending' | 'Failed';
}

export interface OrderItem {
    sku: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    discountPercent: number;
    gstPercent: number;
    lineTotal: number;
}


export interface OrderTotals {
    subTotalTaxable: number;
    totalGst: number;
    grandTotal: number;
}


export interface Order {
    orderId: string;
    orderDate: Date;
    status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
    customer: Customer;
    deliveryAddress: Address;
    payment: PaymentInfo;
    items: OrderItem[];
    totals: OrderTotals;
}