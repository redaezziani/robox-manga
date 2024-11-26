import type { Metadata } from "next";
import MainSideBar from "@/components/shared-ui/main-side-bar";
import MainHeader from "@/components/shared-ui/main-header";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "A Mailx.",
    description: "a Mailx  is a simple mailer app",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` relative w-full h-screen flex antialiased`}>
         <Toaster />
         <Sonner />
      <MainSideBar />
      <div className=" relative h-screen overflow-y-auto w-full flex-col flex gap-3 ">
        <MainHeader />
        <div className="flex flex-col w-full justify-start items-start  min-h-screen mt-20">
          {children}
        </div>
      </div>
    </div>
  );
}

