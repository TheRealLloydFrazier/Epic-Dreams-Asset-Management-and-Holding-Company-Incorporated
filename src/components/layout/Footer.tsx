import Link from 'next/link';

const policyLinks = [
  { href: '/policies/shipping', label: 'Shipping Policy' },
  { href: '/policies/returns', label: 'Returns & Refunds' },
  { href: '/policies/privacy', label: 'Privacy Policy' },
  { href: '/policies/terms', label: 'Terms of Service' }
];

const socialLinks = [
  { href: 'https://instagram.com/epicdreamsent', label: 'Instagram' },
  { href: 'https://youtube.com/@epicdreamsent', label: 'YouTube' },
  { href: 'https://tiktok.com/@epicdreamsent', label: 'TikTok' }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.4em] text-white">Epic Dreams</p>
            <p className="mt-4 text-sm text-white/60">
              Epic Dreams Entertainment is a forward-thinking label building immersive worlds through music, design, and story.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Policies</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {policyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Connect</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              {socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Epic Dreams Entertainment</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
