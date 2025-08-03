import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import cartReducer from "../lib/features/cart/cartSlice";
import ordersReducer from "../lib/features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer, // Keep existing orders for backward compatibility
    cart: cartReducer,
    ordersNew: ordersReducer, // Add new orders slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
