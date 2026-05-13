'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-amber-900">
          SKASASTUDIOS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-700 hover:text-amber-900 transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-amber-900 transition">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-amber-900 transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-amber-900 transition">
            Contact
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-amber-900 transition"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-amber-50 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-700 hover:text-amber-900">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-amber-900">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-amber-900">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-amber-900">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
