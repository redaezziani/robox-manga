import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared-ui/theme-provider";

export const metadata: Metadata = {
  title: "Zender Mailer",
  description: "Zender Mailer is a simple mailer app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` relative w-full h-screen flex antialiased`}>
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
