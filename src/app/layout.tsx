import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MainHeader from '@/components/shared-ui/main-header';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';

import SmoothScrolling from './ui/SmoothScrolling';

import './globals.css';
import Footer from '@/components/shared-ui/footer';
import { ThemeProvider } from '@/components/shared-ui/theme-provider';

const lantx = localFont({
  src: './assets/font/LANTX-Regular.otf',
  variable: '--font-lantx',
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
    suppressHydrationWarning
    lang="ar" >
      <body
        className={`${lantx.variable} font-lantx relative flex  min-h-screen w-full flex-col antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
       
          <div  className="relative">
            <Toaster />
            <Sonner />
            <MainHeader />
          </div>
          <main >
            <SmoothScrolling>

                {children}
                </SmoothScrolling>
          </main>
          <Footer />
          </ThemeProvider>
      </body>
    </html>
  );
}
