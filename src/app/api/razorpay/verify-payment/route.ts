import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/backend/lib/mongodb';
import { Order } from '@/backend/models/Order';
import { sendAdminOrderNotification as sendAdminEmailNotification } from '@/backend/lib/email';
import { sendOrderConfirmationWhatsApp, sendAdminOrderNotification as sendAdminWhatsAppNotification } from '@/backend/lib/whatsapp';
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    // Verify payment signature
    const text = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order status
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        paymentStatus: 'completed',
        status: 'paid',
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Send notifications (email and WhatsApp)
    try {
      await Promise.all([
        sendAdminEmailNotification({
          orderId: order.orderId,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          items: order.items,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
        }),
        sendOrderConfirmationWhatsApp({
          orderId: order.orderId,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          items: order.items,
          totalAmount: order.totalAmount,
        }),
        sendAdminWhatsAppNotification({
          orderId: order.orderId,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          items: order.items,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
        }),
      ]);
    } catch (notificationError) {
      console.error('Error sending notifications:', notificationError);
      // Don't fail the payment verification if notifications fail
    }

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
