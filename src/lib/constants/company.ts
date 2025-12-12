/**
 * Epic Dreams Organization Structure
 *
 * Epic Dreams Asset Management and Holding Company, Incorporated
 * is the parent holding company that owns all Epic Dreams subsidiaries.
 */

export interface CompanyInfo {
  id: string;
  name: string;
  legalName: string;
  type: 'holding' | 'subsidiary';
  status: 'active' | 'inactive' | 'planned';
  description: string;
  mission?: string;
  vision?: string;
  tagline?: string;
  industry?: string;
  website?: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    linkedin?: string;
  };
  parentId?: string;
  logoVariant?: 'primary' | 'light' | 'dark';
}

// Parent Holding Company
export const HOLDING_COMPANY: CompanyInfo = {
  id: 'epic-dreams-holding',
  name: 'Epic Dreams',
  legalName: 'Epic Dreams Asset Management and Holding Company, Incorporated',
  type: 'holding',
  status: 'active',
  description: 'Epic Dreams Asset Management and Holding Company, Incorporated is the heart of the Epic Dreams Organization. We manage and oversee a diverse portfolio of innovative companies across entertainment, technology, and creative industries.',
  mission: 'To build and nurture transformative companies that turn dreams into reality through innovation, creativity, and strategic investment.',
  vision: 'To be the premier holding company for visionary enterprises that shape culture, technology, and human experience.',
  tagline: 'Where Dreams Become Reality',
  industry: 'Asset Management & Holding Company',
  website: 'https://epicdreams.com',
  socials: {
    instagram: 'https://instagram.com/epicdreamsholding',
    linkedin: 'https://linkedin.com/company/epic-dreams-holding',
  },
};

// Subsidiary Companies
export const SUBSIDIARIES: CompanyInfo[] = [
  {
    id: 'epic-dreams-entertainment',
    name: 'Epic Dreams Entertainment',
    legalName: 'Epic Dreams Entertainment LLC',
    type: 'subsidiary',
    status: 'active',
    description: 'A future-facing music label and creative studio, blending immersive storytelling with limited-edition merch drops. Our artists explore the edges of synthwave, R&B, and dream pop.',
    mission: 'To create immersive musical experiences that transport listeners to otherworldly realms.',
    tagline: 'Immersive Worlds Through Music',
    industry: 'Entertainment & Music',
    website: 'https://entertainment.epicdreams.com',
    socials: {
      instagram: 'https://instagram.com/epicdreamsent',
      youtube: 'https://youtube.com/@epicdreamsent',
      tiktok: 'https://tiktok.com/@epicdreamsent',
    },
    parentId: 'epic-dreams-holding',
  },
  {
    id: 'epic-dreams-ai',
    name: 'Epic Dreams AI Solutions',
    legalName: 'Epic Dreams AI Solutions LLC',
    type: 'subsidiary',
    status: 'active',
    description: 'Pioneering artificial intelligence solutions that enhance creativity, productivity, and human potential. We develop cutting-edge AI tools and platforms for businesses and creators.',
    mission: 'To democratize AI technology and make powerful tools accessible to dreamers and innovators everywhere.',
    tagline: 'Intelligence That Inspires',
    industry: 'Artificial Intelligence & Technology',
    website: 'https://ai.epicdreams.com',
    socials: {
      twitter: 'https://twitter.com/epicdreamsai',
      linkedin: 'https://linkedin.com/company/epic-dreams-ai',
    },
    parentId: 'epic-dreams-holding',
  },
];

// Full organization structure
export const EPIC_DREAMS_ORGANIZATION = {
  holding: HOLDING_COMPANY,
  subsidiaries: SUBSIDIARIES,
};

// Helper functions
export function getCompanyById(id: string): CompanyInfo | undefined {
  if (id === HOLDING_COMPANY.id) return HOLDING_COMPANY;
  return SUBSIDIARIES.find(sub => sub.id === id);
}

export function getActiveSubsidiaries(): CompanyInfo[] {
  return SUBSIDIARIES.filter(sub => sub.status === 'active');
}

export function getPlannedSubsidiaries(): CompanyInfo[] {
  return SUBSIDIARIES.filter(sub => sub.status === 'planned');
}

// Brand colors for the organization (can be extended per subsidiary)
export const BRAND_COLORS = {
  primary: {
    teal: '#00f5ff',
    violet: '#6a4bff',
    gold: '#d4af37',
  },
  backgrounds: {
    dark: '#030303',
    cosmic: '#0a0a1a',
  },
  text: {
    primary: '#f5f5f5',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
  },
};

// Company contact information
export const CONTACT_INFO = {
  email: 'contact@epicdreams.com',
  support: 'support@epicdreams.com',
};
