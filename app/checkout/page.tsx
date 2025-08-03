"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../lib/features/cart/cartSlice";
import { addOrder } from "../../lib/features/orders/ordersSlice";
import { CustomerInfo } from "../../lib/features/orders/types";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => (state as any).cart.items || []);
  const cartTotal = useAppSelector((state) => (state as any).cart.total || 0);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    shippingAddress: "",
    phoneNumber: "",
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (
      !customerInfo.fullName ||
      !customerInfo.shippingAddress ||
      !customerInfo.phoneNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Add order to Redux store
    dispatch(addOrder({ customerInfo, items: cartItems }));

    // Clear cart
    dispatch(clearCart());

    // Show thank you message
    setShowThankYou(true);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed. You will receive a
              confirmation email shortly.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to your cart to continue shopping.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Order</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-black line-clamp-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={customerInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="shippingAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shipping Address *
                </label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  value={customerInfo.shippingAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your complete shipping address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
