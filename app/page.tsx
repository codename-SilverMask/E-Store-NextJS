"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Main page: Loading cart from localStorage:", savedCart);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      console.log("Main page: Cart loaded:", parsedCart);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever cart changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      console.log("Main page: Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Show feedback
    setAddedToCart(product.id);
    const newTimeoutId = setTimeout(() => setAddedToCart(null), 1000);
    setTimeoutId(newTimeoutId);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              E-Store
            </h1>
            <div className="flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Cart ({getTotalItems()})
              </Link>
              <Link
                href="/orders"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Orders
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Store
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              Discover amazing products with unbeatable prices
            </p>
            <button className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-sm sm:text-base">
              Shop Now
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
              Featured Products
            </h2>
            {loading ? (
              <div className="text-center">
                <p className="text-base sm:text-lg text-gray-600">
                  Loading products...
                </p>
              </div>
            ) : error ? (
              <div className="text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
                  <p className="font-bold">Error!</p>
                  <p className="text-sm sm:text-base">{error}</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  >
                    <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-lg mb-2 text-black line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 sm:line-clamp-3">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg sm:text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 capitalize">
                          {product.category}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Link
                          href={`/product/${product.id}`}
                          className="block w-full bg-gray-100 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-200 transition duration-300 font-medium text-sm sm:text-base"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className={`w-full px-4 py-2 rounded-lg transition duration-300 font-medium text-sm sm:text-base ${
                            addedToCart === product.id
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {addedToCart === product.id
                            ? "Added!"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 E-Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
