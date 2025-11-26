// Temporarily using system fonts to avoid build-time network fetches
// TODO: Re-enable Google Fonts when deploying to production with network access
// import { Inter, Space_Grotesk } from 'next/font/google';

// export const fontSans = Inter({
//   subsets: ['latin'],
//   variable: '--font-sans'
// });

// export const fontDisplay = Space_Grotesk({
//   subsets: ['latin'],
//   variable: '--font-display'
// });

// Fallback font configuration for development
export const fontSans = {
  variable: '--font-sans',
  className: ''
};

export const fontDisplay = {
  variable: '--font-display',
  className: ''
};

export const displayClass = 'font-display tracking-tight';
