'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    
    // Dispatch event to update cart count in header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      {/* Image Container */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 bg-gray-100 text-gray-900 py-2 rounded hover:bg-gray-200 transition text-center font-medium"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 rounded transition font-medium text-white ${
              isAdded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-amber-900 hover:bg-amber-800'
            }`}
          >
            {isAdded ? '✓ Added' : '🛒 Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
