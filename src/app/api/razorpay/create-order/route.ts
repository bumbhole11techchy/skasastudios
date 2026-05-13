import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectDB } from '@/backend/lib/mongodb';
import { Order } from '@/backend/models/Order';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone, shippingAddress, totalAmount } = body;

    if (!items || !customerName || !customerEmail || !customerPhone || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if Razorpay keys are configured
    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        { error: 'Razorpay is not configured. Please set your keys in environment variables.' },
        { status: 500 }
      );
    }

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        customerName,
        customerEmail,
      },
    });

    // Create order in database
    const orderId = `SKS_${Date.now()}`;
    const order = new Order({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      customerName,
      customerEmail,
      customerPhone,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending',
    });

    await order.save();

    return NextResponse.json(
      {
        orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: totalAmount,
        currency: 'INR',
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error?.error?.description || error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
