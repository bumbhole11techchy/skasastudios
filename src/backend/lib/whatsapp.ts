import twilio from 'twilio';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: any[];
  totalAmount: number;
  shippingAddress?: string;
}

export async function sendOrderConfirmationWhatsApp(orderDetails: OrderDetails) {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Please define TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_NUMBER in your environment variables');
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  const { orderId, customerName, customerPhone, items, totalAmount } = orderDetails;

  // Format phone number to WhatsApp format
  const formattedPhone = customerPhone.startsWith('+') ? customerPhone : `+91${customerPhone}`;

  const message = `🎉 Order Confirmed!

Dear ${customerName},

Thank you for shopping with Skasastudios!

📋 Order ID: ${orderId}
💰 Total Amount: ₹${totalAmount}

🛍️ Items:
${items.map(item => `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`).join('\n')}

We will process your order shortly. You will receive updates on your order status.

Best regards,
Skasastudios Team ✨`;

  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
    });
    console.log('Order confirmation WhatsApp message sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation WhatsApp:', error);
    throw error;
  }
}

export async function sendAdminOrderNotification(orderDetails: OrderDetails) {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Please define TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_WHATSAPP_NUMBER in your environment variables');
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  const { orderId, customerName, customerPhone, items, totalAmount } = orderDetails;

  const adminMessage = `🔔 New Order Alert!

📋 Order ID: ${orderId}
👤 Customer: ${customerName}
📞 Phone: ${customerPhone}
💰 Total: ₹${totalAmount}

🛍️ Items:
${items.map(item => `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price}`).join('\n')}

Please process this order.`;

  try {
    // Send to admin WhatsApp number
    await client.messages.create({
      body: adminMessage,
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`, // Send to admin (same number for now)
    });
    console.log('Admin order notification WhatsApp sent successfully');
  } catch (error) {
    console.error('Error sending admin order notification WhatsApp:', error);
    throw error;
  }
}