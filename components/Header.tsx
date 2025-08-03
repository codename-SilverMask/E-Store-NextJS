"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            E-Store
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Orders
            </Link>
            <Link
              href="/checkout"
              className="relative text-gray-700 hover:text-blue-600 transition duration-300"
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5-4.5m0 0L5.4 5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
