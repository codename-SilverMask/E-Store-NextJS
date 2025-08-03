import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersState, Order, CustomerInfo } from "./types";
import { CartItem } from "../cart/types";

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{ customerInfo: CustomerInfo; items: CartItem[] }>
    ) => {
      const { customerInfo, items } = action.payload;
      const newOrder: Order = {
        id: Date.now().toString(),
        customerInfo,
        items,
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
        totalAmount: items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        orderDate: new Date().toISOString(),
      };
      state.orders.push(newOrder);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
