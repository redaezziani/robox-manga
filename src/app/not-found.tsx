'use client';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex !h-screen !overflow-y-hidden w-full flex-col items-center justify-center bg-background">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="rounded-lg bg-muted px-3 py-1 text-sm">404</span>
          <h1 className="text-3xl font-bold sm:text-4xl">الصفحة غير موجودة</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="default">
              <Home className="ml-2 h-4 w-4" />
              العودة للرئيسية
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            الرجوع للخلف
          </Button>
        </div>
        
        {/* Optional: Add a fun illustration or animation here */}
        <div className="mt-8">
          <img 
            src="/images/404.png" 
            alt="404 Illustration"
            className="max-w-[300px] opacity-80 dark:invert"
          />
        </div>
      </div>
    </main>
  );
}
