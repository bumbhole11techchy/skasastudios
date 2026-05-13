# Skasastudios E-Commerce Website

## Project Overview
A modern, responsive e-commerce website for jewelry brand "skasastudios" built with Next.js, featuring:
- Product catalog with filtering and search
- Shopping cart and checkout system
- Mobile-responsive design (works on PC and mobile)
- Razorpay payment integration (ready for connection)
- Admin panel for product management
- Modern UI with Tailwind CSS

## Tech Stack
- **Frontend**: Next.js 14+ with React
- **Styling**: Tailwind CSS + responsive design
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Payment**: Razorpay (integration ready)
- **Form Validation**: Zod
- **State Management**: Context API

## Project Structure
```
skasastudios/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout page
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities and helpers
│   ├── contexts/              # Context API
│   └── styles/                # Global styles
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── package.json
└── README.md
```

## Development Guidelines
- Use TypeScript for type safety
- Follow responsive design first approach
- Keep components modular and reusable
- Use environment variables for sensitive data
- Test on both mobile and desktop browsers
