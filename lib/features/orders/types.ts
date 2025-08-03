import { CartItem } from "../cart/types";

export interface OrderItem extends CartItem {}

export interface CustomerInfo {
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  orderDate: string;
}

export interface OrdersState {
  orders: Order[];
}
