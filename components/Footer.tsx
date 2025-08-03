export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Store</h3>
            <p className="text-gray-300">
              Your trusted partner for quality products and excellent customer
              service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="/checkout"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@estore.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Store St, City, Country</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2025 E-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
