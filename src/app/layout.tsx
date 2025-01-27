import localFont from 'next/font/local';



import './globals.css';
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


                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
