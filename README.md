# Skasastudios E-Commerce Website

A modern, fully responsive e-commerce website for the jewelry brand "Skasastudios" built with Next.js, React, Tailwind CSS, and MongoDB. Features product catalog, shopping cart, and Razorpay payment integration.

## Features

✨ **Modern & Responsive Design**
- Works seamlessly on PC, tablet, and mobile devices
- Beautiful, intuitive user interface
- Optimized for fast loading

🛍️ **E-Commerce Functionality**
- Product catalog with search and filtering
- Shopping cart management
- Wishlist support (ready to implement)
- Product details pages

💳 **Payment Integration**
- Razorpay payment gateway integration
- Secure payment verification
- Order tracking and management

👨‍💼 **Admin Features**
- Product management (add, edit, delete)
- Order management
- Customer insights

🔒 **Security**
- MongoDB for secure data storage
- Environment variables for sensitive data
- Payment signature verification

📱 **Mobile-First Approach**
- Progressive enhancement
- Touch-friendly interfaces
- Mobile-optimized navigation

## Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Payment**: Razorpay
- **State Management**: Context API
- **Validation**: Zod

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skasastudios.git
   cd skasastudios
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Edit `.env.local` and update:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_SECRET=your_admin_password
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
skasastudios/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product listing
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout page
│   │   ├── order-success/     # Order confirmation
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # API routes
│   │   │   ├── products/      # Product APIs
│   │   │   ├── orders/        # Order APIs
│   │   │   └── razorpay/      # Razorpay APIs
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── lib/                   # Utilities
│   │   └── mongodb.ts         # Database connection
│   ├── models/                # Database models
│   │   ├── Product.ts
│   │   └── Order.ts
│   └── contexts/              # Context providers
├── public/                     # Static assets
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination)
- `POST /api/products` - Create new product (admin)
- `GET /api/products/[id]` - Get product details

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details

### Razorpay
- `POST /api/razorpay/create-order` - Create Razorpay order
- `POST /api/razorpay/verify-payment` - Verify payment

## Available Scripts

```bash
# Development
npm run dev           # Start development server

# Production
npm run build         # Build for production
npm run start         # Start production server

# Utilities
npm run lint          # Run ESLint
npm run type-check    # Type check with TypeScript
```

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to `.env.local`

### Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/skasastudios`

## Razorpay Setup

1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get API keys from settings
3. Add keys to `.env.local`:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET` - Your Razorpay Key Secret

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
1. Build the project: `npm run build`
2. Set environment variables
3. Point to `npm start` as start command

## Testing Payment (Sandbox Mode)

Use Razorpay test credentials:
- **Test Card**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email support@skasastudios.com or call +1 (555) 123-4567

## Roadmap

- [ ] User authentication & accounts
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search & filters
- [ ] Social media integration

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Payment by [Razorpay](https://razorpay.com/)
- Database [MongoDB](https://mongodb.com/)

---

**Made with ❤️ for Skasastudios**
