import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MainHeader from '@/components/shared-ui/main-header';
import { ThemeProvider } from '@/components/shared-ui/theme-provider';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';

import SmoothScrolling from './ui/SmoothScrolling';

import './globals.css';

const lantx = localFont({
  src: './assets/font/LANTX-Regular.otf',
  variable: '--font-lantx',
});

export const metadata: Metadata = {
  title: 'مانجا هيفن | Manga Heaven',
  description:
    'استمتع بأفضل المانجا العربية المترجمة. اكتشف عالماً من القصص المصورة، من الفانتازيا إلى الأكشن. قراءة مباشرة ومجانية لأحدث إصدارات المانجا.',
  keywords: 'مانجا, مانجا عربي, قراءة مانجا, مانجا اون لاين, manga, anime, مانجا هيفن',
  authors: [{ name: 'Manga Heaven' }],
  openGraph: {
    title: 'مانجا هيفن | أفضل موقع لقراءة المانجا',
    description:
      'استمتع بأفضل المانجا العربية المترجمة. اكتشف عالماً من القصص المصورة مع تحديثات يومية.',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={false}
        className={`${lantx.variable} font-lantx relative flex  min-h-screen w-full flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div suppressHydrationWarning={false} className="relative">
            <Toaster />
            <Sonner />
            <MainHeader />
          </div>
          <main suppressHydrationWarning={false}>
            <SmoothScrolling>{children}</SmoothScrolling>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
