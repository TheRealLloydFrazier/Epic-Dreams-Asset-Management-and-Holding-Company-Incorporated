'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@lib/utils/styles';
import { useCart } from '@lib/hooks/use-cart';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/store', label: 'Store' },
  { href: '/artist', label: 'Artists' },
  { href: '/releases', label: 'Releases' },
  { href: '/blog', label: 'Blog' }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.2em]">
          Epic Dreams
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn('text-sm uppercase tracking-[0.3em] text-white/70 hover:text-white', {
                'text-white': pathname === item.href || pathname?.startsWith(item.href + '/')
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative inline-flex items-center">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-teal text-xs font-semibold text-black">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn('py-2 text-sm uppercase tracking-[0.3em] text-white/70 hover:text-white', {
                  'text-white': pathname === item.href || pathname?.startsWith(item.href + '/')
                })}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)} className="py-2 text-sm uppercase tracking-[0.3em]">
              Cart
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
