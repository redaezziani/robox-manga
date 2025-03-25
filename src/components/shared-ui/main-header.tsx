import React from 'react';
import NotificationSheet from './notification-sheet';
import ProfileMenu from './profile-menu';
import MenuSheet from './menu-sheet';
import SearchManga from '@/app/ui/search-manga';
import Link from 'next/link';
import { getCookies } from '@/lib/cookies';
import { Button } from '../ui/button';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import ThemeSwitcher from './theme-switcher';
import HeaderLinks from './header-links';

const MainHeader = async () => {
    const token: RequestCookie | undefined = await getCookies();
   

    return (
        <header
        aria-label='Main Header'
            className='fixed flex flex-col w-full z-50 top-0 left-0 '
        >
            <nav lang="ar" className="bg-muted  container md:max-w-full  w-full border-b-[0.5px] border-gray-400/45 px-4 py-2">
                <div className="container mx-auto flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className=" text-primary  bg-clip-text text-lg font-bold  md:text-2xl">
                            <Link href="/">مانجا كافيه</Link>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Navigation Links */}
                        <HeaderLinks />
                        {/* Right Side Items */}
                        <div className="flex items-center gap-4">
                            {token ? (
                                <>
                                    <ThemeSwitcher />
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
