
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';

import MainSideBar from '@/components/shared-ui/main-side-bar';
import { ThemeProvider } from '@/components/shared-ui/theme-provider';
import { Providers } from '../providers';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
        className=" w-full relative flex justify-start items-start h-screen overflow-hidden "
        >
            <MainSideBar/>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="relative w-full">
                    <Toaster />
                    <Sonner />
                    <main className="w-full">
                        <Providers>
                            {children}
                        </Providers>
                    </main>
                </div>
            </ThemeProvider>
        </div>
    );
}
