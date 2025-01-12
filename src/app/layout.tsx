import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import MainHeader from '@/components/shared-ui/main-header';
import { Toaster as Sonner } from '@/components/ui/sonner';
import SmoothScrolling from './ui/SmoothScrolling';
const lantx = localFont({
    src: './assets/font/LANTX-Regular.otf',
    variable: '--font-lantx'
});

export const metadata: Metadata = {
    title: 'مانجا هيفن | Manga Heaven',
    description: 'استمتع بأفضل المانجا العربية المترجمة. اكتشف عالماً من القصص المصورة، من الفانتازيا إلى الأكشن. قراءة مباشرة ومجانية لأحدث إصدارات المانجا.',
    keywords: 'مانجا, مانجا عربي, قراءة مانجا, مانجا اون لاين, manga, anime, مانجا هيفن',
    authors: [{ name: 'Manga Heaven' }],
    openGraph: {
        title: 'مانجا هيفن | أفضل موقع لقراءة المانجا',
        description: 'استمتع بأفضل المانجا العربية المترجمة. اكتشف عالماً من القصص المصورة مع تحديثات يومية.',
        locale: 'ar_SA',
        type: 'website',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning={false} className={`${lantx.variable} relative flex flex-col  min-h-screen w-full antialiased font-lantx`}>
                <div suppressHydrationWarning={false} className="relative">
                    <Toaster />
                    <Sonner />
                    <MainHeader />
                </div>
                <main suppressHydrationWarning={false}>
                    <SmoothScrolling >
                        {children}
                    </SmoothScrolling>
                </main>
            </body>
        </html>
    );
}
