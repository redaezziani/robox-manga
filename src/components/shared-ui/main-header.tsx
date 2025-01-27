import React from 'react';
import NotificationSheet from './notification-sheet';
import ProfileMenu from './profile-menu';
import MenuSheet from './menu-sheet';
import SearchManga from '@/app/ui/search-manga';
import Link from 'next/link';
import { getCookies } from '@/lib/cookies';
import { Button } from '../ui/button';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import Banner from './banner';

const MainHeader = async () => {
    const token: RequestCookie | undefined = await getCookies();

    const navigationItems = [
        { name: 'الرئيسية', href: '/' },
        { name: 'جميع المانجا', href: '/all' },
        { name: 'المفضلة', href: '/favorites' },
        { name: 'قراءة لاحقاً', href: '/read-later' },
        { name: 'الإعدادات', href: '/settings' },
    ];

    return (
        <header
        aria-label='Main Header'
            className='fixed flex flex-col w-full z-50 top-0 left-0 '
        >
            <Banner />
            <nav lang="ar" className="bg-muted  container md:max-w-full  w-full border-b border-slate-400/35 px-4 py-2">
                <div className="container mx-auto flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="MangaHeaven" className="h-6 dark:invert" />
                        <h1 className="bg-gradient-to-bl from-blue-600 to-blue-400 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
                            روبوكس
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Navigation Links */}
                        <ul className="hidden items-center gap-6 md:flex">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Right Side Items */}
                        <div className="flex items-center gap-4">
                            {token ? (
                                <>
                                    <NotificationSheet />
                                    <div className="hidden md:block">
                                        <SearchManga />
                                    </div>
                                    <div className="hidden md:block">
                                        <ProfileMenu />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="hidden md:block">
                                        <SearchManga />
                                    </div>
                                    <div className="hidden items-center gap-2 md:flex">
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
                                </>
                            )}
                            <MenuSheet token={token} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default MainHeader;
