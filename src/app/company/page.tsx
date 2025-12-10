import { Metadata } from 'next';
import Link from 'next/link';
import { displayClass } from '@lib/utils/fonts';
import {
  HOLDING_COMPANY,
  SUBSIDIARIES,
  type CompanyInfo,
} from '@lib/constants/company';

export const metadata: Metadata = {
  title: 'Our Organization',
  description: 'Discover the Epic Dreams Organization - a family of innovative companies spanning entertainment, AI, and beyond.',
};

function CompanyCard({ company, isHolding = false }: { company: CompanyInfo; isHolding?: boolean }) {
  const statusColors = {
    active: 'bg-accent-teal/20 text-accent-teal',
    inactive: 'bg-gray-500/20 text-gray-400',
    planned: 'bg-accent-violet/20 text-accent-violet',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isHolding
          ? 'border-accent-teal/30 bg-gradient-to-br from-accent-teal/5 to-accent-violet/5 hover:border-accent-teal/50'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      {/* Infinity symbol background decoration */}
      <div className="absolute -right-8 -top-8 text-[120px] font-bold text-white/[0.02] select-none">
        ∞
      </div>

      <div className="relative p-6">
        {/* Status badge */}
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusColors[company.status]}`}>
          {company.status}
        </span>

        {/* Company type */}
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {company.type === 'holding' ? 'Parent Company' : 'Subsidiary'}
        </p>

        {/* Company name */}
        <h3 className={`${displayClass} mt-2 text-2xl text-white`}>
          {company.name}
        </h3>

        {/* Legal name */}
        <p className="mt-1 text-xs text-white/50">
          {company.legalName}
        </p>

        {/* Industry tag */}
        {company.industry && (
          <p className="mt-3 text-xs font-medium text-accent-violet">
            {company.industry}
          </p>
        )}

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {company.description}
        </p>

        {/* Tagline */}
        {company.tagline && (
          <p className="mt-4 border-l-2 border-accent-teal/50 pl-3 text-sm italic text-white/60">
            &ldquo;{company.tagline}&rdquo;
          </p>
        )}

        {/* Social links */}
        {company.socials && Object.keys(company.socials).length > 0 && (
          <div className="mt-6 flex gap-3">
            {company.socials.instagram && (
              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 transition-colors hover:text-accent-teal"
              >
                Instagram
              </a>
            )}
            {company.socials.youtube && (
              <a
                href={company.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 transition-colors hover:text-accent-teal"
              >
                YouTube
              </a>
            )}
            {company.socials.tiktok && (
              <a
                href={company.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 transition-colors hover:text-accent-teal"
              >
                TikTok
              </a>
            )}
            {company.socials.twitter && (
              <a
                href={company.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 transition-colors hover:text-accent-teal"
              >
                Twitter
              </a>
            )}
            {company.socials.linkedin && (
              <a
                href={company.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 transition-colors hover:text-accent-teal"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const activeSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'active');
  const plannedSubsidiaries = SUBSIDIARIES.filter(s => s.status === 'planned');

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">
          Our Organization
        </p>
        <h1 className={`${displayClass} mt-3 text-4xl md:text-5xl`}>
          The Epic Dreams Family
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          A constellation of innovative companies united by a singular vision:
          to transform dreams into reality through creativity, technology, and purposeful enterprise.
        </p>
      </div>

      {/* Organization Visual */}
      <div className="mt-16">
        {/* Infinity Symbol Decoration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <span className="text-6xl text-accent-teal/30">∞</span>
            <span className="absolute inset-0 flex items-center justify-center text-6xl text-accent-violet/20 blur-sm">∞</span>
          </div>
        </div>

        {/* Holding Company (The Heart) */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
            The Heart of Epic Dreams
          </h2>
          <CompanyCard company={HOLDING_COMPANY} isHolding />
        </div>

        {/* Connection Line */}
        <div className="mb-12 flex justify-center">
          <div className="h-16 w-px bg-gradient-to-b from-accent-teal/50 to-white/10" />
        </div>

        {/* Active Subsidiaries */}
        {activeSubsidiaries.length > 0 && (
          <div>
            <h2 className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
              Our Companies
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {activeSubsidiaries.map((subsidiary) => (
                <CompanyCard key={subsidiary.id} company={subsidiary} />
              ))}
            </div>
          </div>
        )}

        {/* Planned Subsidiaries */}
        {plannedSubsidiaries.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
              Coming Soon
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plannedSubsidiaries.map((subsidiary) => (
                <CompanyCard key={subsidiary.id} company={subsidiary} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mission & Vision */}
      <div className="mt-20 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-teal">Our Mission</p>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {HOLDING_COMPANY.mission}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-violet">Our Vision</p>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {HOLDING_COMPANY.vision}
          </p>
        </div>
      </div>

      {/* Back to About */}
      <div className="mt-16 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <span>←</span>
          <span>Back to About</span>
        </Link>
      </div>
    </div>
  );
}
