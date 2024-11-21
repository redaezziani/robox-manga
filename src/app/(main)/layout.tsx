import type { Metadata } from "next";
import MainSideBar from "@/components/shared-ui/main-side-bar";
import MainHeader from "@/components/shared-ui/main-header";

export const metadata: Metadata = {
  title: "Main App Layout",
  description: "Main App Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={` relative w-full h-screen flex antialiased`}>
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

