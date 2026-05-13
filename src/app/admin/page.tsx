'use client';

import { FormEvent, useEffect, useState } from 'react';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  stock: string;
  sku: string;
}

const initialForm: ProductForm = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  category: 'Rings',
  stock: '0',
  sku: '',
};

const PRODUCT_CATEGORIES = [
  'Rings',
  'Necklaces',
  'Bracelets',
  'Earrings',
  'Anklets',
  'Pendants',
  'Brooches',
  'Custom Collections',
];

const warmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .admin-wrap {
    min-height: 100vh;
    background: linear-gradient(150deg, #fdf8f0 0%, #fef5e4 50%, #fdf0dc 100%);
    font-family: 'Jost', sans-serif;
    position: relative;
  }

  .admin-wrap::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .admin-card {
    position: relative;
    z-index: 1;
    background: linear-gradient(145deg, #fffdf8 0%, #fdf8ee 100%);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    box-shadow:
      0 2px 4px #c9a84c0a,
      0 8px 32px #c9a84c12,
      0 32px 64px #c9a84c08,
      inset 0 1px 0 #fff8ec;
  }

  .admin-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 4px;
    background: linear-gradient(135deg, #d4a84b33, transparent 40%, transparent 60%, #d4a84b22);
    pointer-events: none;
    z-index: -1;
  }

  .serif-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c1a0e;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  .gold-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8a6020;
  }

  .warm-input {
    width: 100%;
    background: #fffcf5;
    border: 1px solid #ddc87a66;
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #3a2410;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-top: 6px;
  }

  .warm-input:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
    background: #fffef9;
  }

  .warm-input::placeholder {
    color: #c4a882;
  }

  .warm-select {
    width: 100%;
    background: #fffcf5;
    border: 1px solid #ddc87a66;
    border-radius: 2px;
    padding: 10px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #3a2410;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-top: 6px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c9a84c' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .warm-select:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px #c9a84c18;
    background-color: #fffef9;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c9a84c' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  .warm-select option {
    background: #fffcf5;
    color: #3a2410;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    padding: 8px;
  }

  .warm-textarea {
    resize: none;
    height: 100px;
  }

  .gold-btn {
    width: 100%;
    background: linear-gradient(135deg, #c9a84c 0%, #a8832a 100%);
    color: #fff8ec;
    border: none;
    border-radius: 2px;
    padding: 14px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 16px #c9a84c44;
  }

  .gold-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px #c9a84c55;
  }

  .ghost-btn {
    background: transparent;
    border: 1px solid #c9a84c88;
    color: #8a6020;
    border-radius: 2px;
    padding: 9px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .ghost-btn:hover {
    background: #c9a84c11;
    color: #6b4a10;
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0 20px;
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

  .status-bar {
    background: linear-gradient(90deg, #fdf6e3, #fef9ed);
    border: 1px solid #e8d5a888;
    border-radius: 2px;
    padding: 10px 16px;
    font-size: 0.82rem;
    font-weight: 400;
    color: #6b4a10;
    letter-spacing: 0.03em;
  }

  .file-input-wrap {
    margin-top: 6px;
    position: relative;
  }

  .file-input-wrap input[type="file"] {
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    color: #6b4a10;
    background: #fffcf5;
    border: 1px dashed #c9a84c88;
    border-radius: 2px;
    padding: 10px 14px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .file-input-wrap input[type="file"]:hover {
    border-color: #c9a84c;
  }

  .file-input-wrap input[type="file"]::file-selector-button {
    background: linear-gradient(135deg, #c9a84c, #a8832a);
    color: #fff8ec;
    border: none;
    border-radius: 2px;
    padding: 5px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    margin-right: 10px;
  }

  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a0722a;
    border: 1px solid #d4a84b55;
    padding: 3px 12px;
    border-radius: 2px;
    background: #fff9f0;
  }

  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, #fdf8f0, #fef5e4, #fdf0dc);
    font-family: 'Jost', sans-serif;
  }

  .loading-card {
    background: linear-gradient(145deg, #fffdf8, #fdf8ee);
    border: 1px solid #e8d5a8;
    border-radius: 4px;
    padding: 36px 48px;
    box-shadow: 0 8px 40px #c9a84c14;
    text-align: center;
  }

  .loading-spinner {
    width: 28px;
    height: 28px;
    border: 2px solid #e8d5a8;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function verify() {
      try {
        const response = await fetch('/api/admin/verify');
        if (response.ok) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('Verifying credentials...');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: loginPassword }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      setStatusMessage('Admin access granted. You may add products now.');
      setLoginPassword('');
    } else {
      setStatusMessage('Invalid admin password.');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setFormData(initialForm);
    setSelectedFile(null);
    setStatusMessage('Logged out successfully.');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('Uploading product...');

    if (!selectedFile) {
      setStatusMessage('Please select an image file.');
      return;
    }

    const imageData = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Unable to read image file');
      reader.readAsDataURL(selectedFile);
    });

    if (!imageData || typeof imageData !== 'string') {
      setStatusMessage('Image upload failed.');
      return;
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: formData.price,
        originalPrice: formData.originalPrice,
        stock: formData.stock,
        imageData,
      }),
    });

    if (response.ok) {
      setStatusMessage('Product uploaded successfully.');
      setFormData(initialForm);
      setSelectedFile(null);
    } else {
      const error = await response.json();
      setStatusMessage(error?.error || 'Unable to upload product.');
    }
  };

  if (loading) {
    return (
      <>
        <style suppressHydrationWarning>{warmStyles}</style>
        <div className="loading-screen">
          <div className="loading-card">
            <div className="loading-spinner" />
            <p className="serif-title" style={{ fontSize: '1.1rem' }}>Verifying access...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <style suppressHydrationWarning>{warmStyles}</style>
        <div className="admin-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '420px', padding: '48px 40px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a0722a', marginBottom: '10px' }}>
                ✦ &nbsp; Skasastudios &nbsp; ✦
              </p>
              <h1 className="serif-title" style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
                Admin Portal
              </h1>
              <div className="ornament-divider" style={{ marginTop: '16px' }}>
                <div className="ornament-dot" />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#8a6020', letterSpacing: '0.04em', fontWeight: 300 }}>
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <label className="block" style={{ marginBottom: '20px' }}>
                <span className="gold-label">Admin Password</span>
                <input
                  id="adminPassword"
                  type="password"
                  className="warm-input"
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  required
                />
              </label>
              <button type="submit" className="gold-btn">
                Sign In
              </button>
            </form>

            {statusMessage && (
              <div className="status-bar" style={{ marginTop: '16px', color: '#9b3a1a' }}>
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style suppressHydrationWarning>{warmStyles}</style>
      <div className="admin-wrap" style={{ padding: '2.5rem 1.5rem' }}>
        <div className="admin-card" style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 44px' }}>

          {/* Page Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span className="tag-pill">✦ Product Management</span>
                  <span className="tag-pill">Cloudinary · MongoDB</span>
                </div>
                <h1 className="serif-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.15 }}>
                  Upload New Product
                </h1>
                <p style={{ marginTop: '8px', fontSize: '0.82rem', color: '#8a6020', fontWeight: 300, letterSpacing: '0.02em' }}>
                  Add product details and upload images — stored via Cloudinary & MongoDB.
                </p>
              </div>
              <button type="button" onClick={handleLogout} className="ghost-btn">
                Sign Out
              </button>
            </div>
            <div className="ornament-divider">
              <div className="ornament-dot" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>

            {/* Name + SKU */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="block">
                <span className="gold-label">Product Name</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="warm-input"
                  required
                />
              </label>
              <label className="block">
                <span className="gold-label">SKU</span>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(event) => setFormData({ ...formData, sku: event.target.value })}
                  className="warm-input"
                  required
                />
              </label>
            </div>

            {/* Description */}
            <label className="block">
              <span className="gold-label">Description</span>
              <textarea
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                className="warm-input warm-textarea"
                required
              />
            </label>

            {/* Price + Original Price + Stock */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <label className="block">
                <span className="gold-label">Price</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                  className="warm-input"
                  required
                />
              </label>
              <label className="block">
                <span className="gold-label">Original Price</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(event) => setFormData({ ...formData, originalPrice: event.target.value })}
                  className="warm-input"
                />
              </label>
              <label className="block">
                <span className="gold-label">Stock</span>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(event) => setFormData({ ...formData, stock: event.target.value })}
                  className="warm-input"
                />
              </label>
            </div>

            {/* Category + Image */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label className="block">
                <span className="gold-label">Category</span>
                <select
                  value={formData.category}
                  onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                  className="warm-select"
                  required
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="gold-label">Product Image</span>
                <div className="file-input-wrap">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
                    required
                  />
                </div>
              </label>
            </div>

            {/* Divider before submit */}
            <div className="ornament-divider" style={{ margin: '4px 0' }}>
              <div className="ornament-dot" />
            </div>

            <button type="submit" className="gold-btn">
              Upload Product
            </button>

            {statusMessage && (
              <div className="status-bar">
                {statusMessage}
              </div>
            )}
          </form>

        </div>
      </div>
    </>
  );
}