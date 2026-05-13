# Order Notifications Setup Guide

This guide will help you set up email and WhatsApp notifications for order confirmations.

## Email Configuration

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this password

3. **Update `.env.local`**:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   EMAIL_FROM=noreply@skasastudios.com
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Create SendGrid Account**:
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Create an API key from Settings → API Keys

2. **Update `.env.local`**:
   ```
   EMAIL_SERVICE=sendgrid
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=noreply@skasastudios.com
   ```

## WhatsApp Configuration (Twilio)

1. **Create Twilio Account**:
   - Sign up at [twilio.com](https://www.twilio.com/console)

2. **Get Your Credentials**:
   - Go to [Twilio Console](https://www.twilio.com/console)
   - Copy your **Account SID** and **Auth Token**

3. **Set Up WhatsApp Sandbox**:
   - Go to [WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/learn)
   - Follow the sandbox setup instructions to enable WhatsApp
   - You'll get a sandbox WhatsApp number (looks like `+14155552671`)

4. **Join the Sandbox**:
   - Send `join <sandbox-keyword>` to the sandbox number from WhatsApp
   - Example: `join clever-penguin`

5. **Update `.env.local`**:
   ```
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_FROM=+14155552671
   ```

## Testing

After configuration, test the notifications:

1. **Test Email**: Check your email during checkout
2. **Test WhatsApp**: Check WhatsApp for order confirmation message

## Production Deployment

For production:

1. **Use Environment Variables**: Don't commit `.env.local` to git
2. **Use Verified Senders**: 
   - For Email: Verify your domain with SendGrid
   - For WhatsApp: Get production approval from Twilio
3. **Rate Limiting**: Consider adding rate limiting for notification requests
4. **Error Handling**: Monitor logs for notification failures

## Troubleshooting

### Email Not Sending
- Verify credentials are correct
- Check if Gmail has blocked the access (check security alerts)
- For SendGrid, verify the sender email is authorized

### WhatsApp Not Sending
- Ensure customer phone number is in correct format (+country code)
- Verify Twilio account has active credits
- Check if phone number is registered on WhatsApp
- Ensure you've completed sandbox join process

### Development Logs
Check your terminal/console logs for detailed error messages:
```
Error sending email: ...
Error sending WhatsApp message: ...
```

## Notes

- Email and WhatsApp are sent **after** payment verification succeeds
- If notifications fail, the order is still created and payment is confirmed
- Notifications are sent asynchronously using `Promise.all()`
- Customize email template in `src/lib/email.ts`
- Customize WhatsApp message in `src/lib/whatsapp.ts`
