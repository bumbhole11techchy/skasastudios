'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .products-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .products-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .products-inner {
    flex: 1;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 3rem 1.5rem;
    position: relative;
    z-index: 1;
  }

  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c1a0e;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 28px;
  }
  .ornament-divider::before,
  .ornament-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c9a84c55, transparent);
  }
  .ornament-dot {
    width: 5px;
    height: 5px;
    background: #c9a84c;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #a0722a;
    border: 1px solid #d4a84b55;
    padding: 3px 12px;
    border-radius: 2px;
    background: #fff9f0;
    margin-bottom: 12px;
  }

  /* Search input */
  .warm-search {
    flex: 1;
    background: #fffcf5;
    border: 1px solid #ddc87a66;
    border-radius: 2px;
    padding: 10px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: #3a2410;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    min-width: 0;
  }
  .warm-search:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
    background: #fffef9;
  }
  .warm-search::placeholder { color: #c4a882; }

  /* Category select */
  .warm-select {
    background: #fffcf5;
    border: 1px solid #ddc87a66;
    border-radius: 2px;
    padding: 10px 38px 10px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #3a2410;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c9a84c'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
    min-width: 180px;
  }
  .warm-select:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
  }

  /* Category pill buttons */
  .cat-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a0722a;
    border: 1px solid #d4a84b55;
    padding: 6px 16px;
    border-radius: 2px;
    background: #fff9f0;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, color 0.18s;
    white-space: nowrap;
  }
  .cat-btn:hover {
    background: #fef3d4;
    border-color: #c9a84c;
    color: #6b4a10;
  }
  .cat-btn.active {
    background: linear-gradient(135deg, #c9a84c, #a8832a);
    border-color: transparent;
    color: #fff8ec;
  }

  /* Loading */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
    gap: 16px;
  }
  .loading-spinner {
    width: 28px;
    height: 28px;
    border: 2px solid #e8d5a8;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 5rem 1rem;
  }

  /* Filter bar */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
  }

  .results-count {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: #b09060;
    font-weight: 300;
    margin-left: auto;
  }
`;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (category) query.append('category', category);

        const res = await fetch(`/api/products?${query.toString()}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Pendants'];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: warmStyles }} />
      <div className="products-wrap">
        <Header />

        <div className="products-inner">

          {/* Page heading */}
          <div style={{ marginBottom: '8px' }}>
            <span className="tag-pill">✦ Handcrafted Collection</span>
            <h1 className="serif-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Our Products
            </h1>
          </div>
          <div className="ornament-divider"><div className="ornament-dot" /></div>

          {/* Filters */}
          <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Search + select row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="warm-search"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="warm-select"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Category pill row */}
            <div className="filter-bar">
              <button
                className={`cat-btn${category === '' ? ' active' : ''}`}
                onClick={() => setCategory('')}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-btn${category === cat ? ' active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              {!loading && (
                <span className="results-count">
                  {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>

          </div>

          {/* Divider */}
          <div className="ornament-divider" style={{ margin: '0 0 28px' }}>
            <div className="ornament-dot" />
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.82rem',
                color: '#a0722a',
                letterSpacing: '0.1em',
                fontWeight: 300,
              }}>
                Curating your collection...
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}>
              {filteredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#8a6020',
                marginBottom: '8px',
              }}>
                No pieces found
              </p>
              <p style={{
                fontSize: '0.82rem',
                color: '#b09060',
                letterSpacing: '0.04em',
                fontWeight: 300,
              }}>
                Try adjusting your search or category filters
              </p>
              <div className="ornament-divider" style={{ maxWidth: '180px', margin: '20px auto' }}>
                <div className="ornament-dot" />
              </div>
            </div>
          )}

        </div>

        <Footer />
      </div>
    </>
  );
}