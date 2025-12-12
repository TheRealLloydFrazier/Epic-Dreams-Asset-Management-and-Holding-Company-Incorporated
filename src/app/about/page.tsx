import Link from 'next/link';
import { displayClass } from '@lib/utils/fonts';
import { HOLDING_COMPANY, SUBSIDIARIES } from '@lib/constants/company';

export default function AboutPage() {
  const entertainment = SUBSIDIARIES.find(s => s.id === 'epic-dreams-entertainment');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">About</p>
      <h1 className={`${displayClass} mt-3 text-4xl`}>Epic Dreams Entertainment</h1>

      {/* Part of Epic Dreams Organization badge */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
        <span className="text-lg text-accent-teal">∞</span>
        <span className="text-xs text-white/60">
          A subsidiary of{' '}
          <Link href="/company" className="text-white/80 underline decoration-accent-teal/50 underline-offset-2 hover:text-white">
            {HOLDING_COMPANY.name}
          </Link>
        </span>
      </div>

      <div className="prose prose-invert mt-8 max-w-none space-y-4">
        <p>
          {entertainment?.description || 'Epic Dreams Entertainment is a future-facing music label and creative studio, blending immersive storytelling with limited-edition merch drops. Our artists explore the edges of synthwave, R&B, and dream pop.'}
        </p>
        <p>
          This microstore showcases signature apparel, collectibles, and signed editions crafted in collaboration with our roster
          and community. Each release is designed to feel like a portal into the worlds our artists build.
        </p>
      </div>

      {/* Organization Section */}
      <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl text-accent-teal/60">∞</span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Part of the</p>
            <p className={`${displayClass} text-lg`}>Epic Dreams Organization</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/60">
          Epic Dreams Entertainment is proudly part of the Epic Dreams family of companies,
          united under {HOLDING_COMPANY.legalName}.
        </p>
        <Link
          href="/company"
          className="mt-4 inline-flex items-center gap-2 text-sm text-accent-teal transition-colors hover:text-accent-teal/80"
        >
          <span>Explore Our Organization</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
