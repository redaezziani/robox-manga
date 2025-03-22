import React from 'react';
import NotificationSheet from './notification-sheet';
import ProfileMenu from './profile-menu';
import MenuSheet from './menu-sheet';
import SearchManga from '@/app/ui/search-manga';
import Link from 'next/link';
import { getCookies } from '@/lib/cookies';
import { Button } from '../ui/button';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const MainHeader = async () => {
    const token: RequestCookie | undefined = await getCookies();

    const navigationItems = [
        { name: 'الرئيسية', href: '/app/' },
        { name: 'جميع المانجا', href: '/app/all' },
        { name: 'المفضلة', href: '/app/favorites' },
        { name: 'قراءة لاحقاً', href: '/app/read-later' },
        { name: 'الإعدادات', href: '/app/settings' },
    ];

    return (
        <header
        aria-label='Main Header'
            className='fixed flex flex-col w-full z-50 top-0 left-0 '
        >
            <nav lang="ar" className="bg-muted  container md:max-w-full  w-full border-b border-slate-400/35 px-4 py-2">
                <div className="container mx-auto flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className=" text-primary  bg-clip-text text-lg font-bold  md:text-2xl">
                            <Link href="/">مانجا كافيه</Link>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Navigation Links */}
                        <ul className="hidden items-center gap-6 md:flex">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-primary duration-300"
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
