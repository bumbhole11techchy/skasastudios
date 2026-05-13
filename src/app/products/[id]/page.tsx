import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/backend/lib/mongodb';
import { Product } from '@/backend/models/Product';

interface ProductPageProps {
  params: {
    id: string;
  };
}

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  sku: string;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  await connectDB();
  const product = (await Product.findById(params.id).lean()) as ProductType | null;

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: `${product.name} | Skasastudios`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  await connectDB();

  const product = (await Product.findById(params.id).lean()) as ProductType | null;

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-700">{product.category}</p>
              <h1 className="mt-3 text-4xl font-semibold text-gray-900">{product.name}</h1>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-amber-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <p className="text-base leading-7 text-gray-700">{product.description}</p>
              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500">SKU</p>
                <p className="mt-2 text-sm font-medium text-gray-900">{product.sku}</p>
                <p className="mt-3 text-sm text-gray-600">Stock: {product.stock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
