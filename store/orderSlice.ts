import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [
    // Sample orders for demonstration
    {
      orderId: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      items: [
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          price: 109.95,
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          quantity: 1
        },
        {
          id: 2,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
          price: 22.3,
          image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          quantity: 2
        }
      ],
      totalItems: 3,
      totalAmount: 154.55,
      orderDate: '2025-08-01T10:30:00Z',
      status: 'delivered'
    },
    {
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      items: [
        {
          id: 3,
          title: 'Mens Cotton Jacket',
          price: 55.99,
          image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
          quantity: 1
        }
      ],
      totalItems: 1,
      totalAmount: 55.99,
      orderDate: '2025-07-30T14:15:00Z',
      status: 'shipped'
    },
    {
      orderId: 'ORD-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@example.com',
      items: [
        {
          id: 4,
          title: 'Mens Casual Slim Fit',
          price: 15.99,
          image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
          quantity: 3
        },
        {
          id: 5,
          title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
          price: 695,
          image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
          quantity: 1
        }
      ],
      totalItems: 4,
      totalAmount: 742.97,
      orderDate: '2025-07-28T09:45:00Z',
      status: 'processing'
    }
  ]
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, 'orderId' | 'orderDate'>>) => {
      const newOrder: Order = {
        ...action.payload,
        orderId: `ORD-${String(state.orders.length + 1).padStart(3, '0')}`,
        orderDate: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.orderId === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
