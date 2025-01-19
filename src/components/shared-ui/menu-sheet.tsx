import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import SearchManga from '@/app/ui/search-manga';
import ProfileMenu from './profile-menu';
import Link from 'next/link';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const MenuSheet = async ({token} : {token: RequestCookie | undefined}) => {

  const navigationItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'جميع المانجا', href: '/all' },
    { name: 'المفضلة', href: '/favorites' },
    { name: 'قراءة لاحقاً', href: '/read-later' },
{ name: 'الإعدادات', href: '/settings' },
  ];

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] p-0 pt-8">
        <SheetHeader className="px-4">
          <div className="flex mt-6 items-center justify-between">
            <SheetTitle>القائمة</SheetTitle>
            {token ? (
              <ProfileMenu />
            ) : ( <div className=" items-center gap-2 flex">
                <Link href="/login">
                    <Button variant="ghost" size="sm">
                        تسجيل الدخول
                    </Button>
                </Link>
                <Link href="/register">
                    <Button size="sm">
                        إنشاء حساب
                    </Button>
                </Link>
            </div>
            )}
          </div>
        </SheetHeader>

        <div className="mt-4 flex flex-col gap-4">
          <div className="px-4">
            <SearchManga />
          </div>

          <nav className="flex w-full flex-col">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex w-full items-center justify-start border-b border-border px-4 py-3 text-right text-sm hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
