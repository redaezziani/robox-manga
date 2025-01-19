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
    
    
    return (
        <nav lang="ar" className="bg-muted fixed container md:max-w-full left-0 top-0 z-50 w-full border-b border-slate-400/35 px-4 py-2">
            <div className="container mx-auto flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="MangaHeaven" className="h-6 dark:invert" />
                    <h1 className="bg-gradient-to-bl from-sky-500 to-sky-300 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
                        روبوكس
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    {/* Navigation Links */}
                    <ul className="hidden items-center gap-6 md:flex">
                        <li>
                            <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
                                الرئيسية
                            </Link>
                        </li>
                        <li>
                            <Link href="/all" className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
                                جميع المانجا
                            </Link>
                        </li>
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
    );
};

export default MainHeader;
