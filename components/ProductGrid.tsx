"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../lib/hooks";
import { addToCart } from "../lib/features/cart/cartSlice";
import { Product } from "../lib/features/products/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <article
          key={product.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain hover:scale-105 transition duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition duration-300">
                {product.title}
              </h3>
            </Link>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
