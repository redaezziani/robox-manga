
import MainHeader from '@/components/shared-ui/main-header';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';

import SmoothScrolling from '../ui/SmoothScrolling';

import Footer from '@/components/shared-ui/footer';
import { ThemeProvider } from '@/components/shared-ui/theme-provider';
import { Providers } from '../providers';





export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        
            <div
                className={`$ font-lantx relative flex  min-h-screen w-full flex-col antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    <div className="relative">
                        <Toaster />
                        <Sonner />
                        <MainHeader />
                    </div>
                    <main >
                        <SmoothScrolling>
                            <Providers>
                                {children}
                            </Providers>
                        </SmoothScrolling>
                    </main>
                    <Footer />
                </ThemeProvider>
            </div>
       
    );
}
