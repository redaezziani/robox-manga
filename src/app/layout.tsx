import type { Metadata } from "next";
import "./globals.css";


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
    <html lang="en">
      <body className={` relative w-full h-screen flex antialiased`}>
            {children}
      </body>
    </html>
  );
}
