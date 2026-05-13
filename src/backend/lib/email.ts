import nodemailer from 'nodemailer';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: any[];
  totalAmount: number;
  shippingAddress?: string;
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Please define EMAIL_USER and EMAIL_PASS in your environment variables');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const { orderId, customerName, customerEmail, items, totalAmount } = orderDetails;

  const itemsList = items.map(item =>
    `<li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price}</li>`
  ).join('');

  const mailOptions = {
    from: EMAIL_FROM,
    to: customerEmail,
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a84c;">Order Confirmation</h2>
        <p>Dear ${customerName},</p>
        <p>Thank you for your order! Your order has been successfully placed.</p>

        <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

          <h4>Items:</h4>
          <ul>
            ${itemsList}
          </ul>
        </div>

        <p>We will process your order shortly. You will receive updates on your order status.</p>

        <p>Best regards,<br>Skasastudios Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
}

export async function sendAdminOrderNotification(orderDetails: OrderDetails) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Please define EMAIL_USER and EMAIL_PASS in your environment variables');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const { orderId, customerName, customerEmail, items, totalAmount } = orderDetails;

  const itemsList = items.map(item =>
    `<li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price}</li>`
  ).join('');

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_USER, // Send to admin email
    subject: `New Order Received - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9a84c;">New Order Alert</h2>
        <p>A new order has been placed on Skasastudios.</p>

        <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

          <h4>Items:</h4>
          <ul>
            ${itemsList}
          </ul>
        </div>

        <p>Please process this order as soon as possible.</p>

        <p>Best regards,<br>Skasastudios System</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin order notification email sent successfully');
  } catch (error) {
    console.error('Error sending admin order notification email:', error);
    throw error;
  }
}