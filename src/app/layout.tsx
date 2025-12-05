import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Footer } from '@components/layout/Footer';
import { Header } from '@components/layout/Header';
import { Analytics } from '@components/layout/Analytics';
import { fontSans, fontDisplay } from '@lib/utils/fonts';
import { Providers } from '@components/layout/Providers';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Epic Dreams Entertainment',
    default: 'Epic Dreams Entertainment — Official Merch'
  },
  description:
    'Explore limited drops, signed merch, and official apparel from Epic Dreams Entertainment artists.',
  openGraph: {
    title: 'Epic Dreams Entertainment — Official Merch',
    description:
      'Explore limited drops, signed merch, and official apparel from Epic Dreams Entertainment artists.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Epic Dreams Entertainment merch collage'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@epicdreamsent',
    title: 'Epic Dreams Entertainment — Official Merch'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`} suppressHydrationWarning>
      <body className="bg-black text-foreground min-h-screen">
        <Analytics />
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
