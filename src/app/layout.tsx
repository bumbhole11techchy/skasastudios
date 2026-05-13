import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skasastudios - Premium Jewelry',
  description: 'Discover exquisite jewelry collections from skasastudios. Premium jewelry for every occasion.',
  keywords: 'jewelry, accessories, gold, silver, premium jewelry',
  authors: [{ name: 'Skasastudios' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#8B7355" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
