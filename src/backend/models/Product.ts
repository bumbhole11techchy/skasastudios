import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
