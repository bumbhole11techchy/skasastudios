import { connectDB } from '@/backend/lib/mongodb';
import { Product } from '@/backend/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/backend/lib/cloudinary';
import { isAdminRequest } from '@/backend/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      stock,
      sku,
      imageData,
    } = body as {
      name: string;
      description: string;
      price: string;
      originalPrice?: string;
      category: string;
      stock?: string;
      sku: string;
      imageData?: string;
    };

    if (!imageData) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const uploadResult = await uploadImage(imageData);
    const image = uploadResult;

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      stock: stock ? parseInt(stock, 10) : 0,
      sku,
      image,
    });

    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
