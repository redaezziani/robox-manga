import React from 'react';

import Menu from './menu';
import ProfileMenu from './profile-menu';
import  SearchManga  from '@/app/ui/search-manga';

const MainHeader = () => {
    return (
        <nav
        lang='ar'
        className=" bg-muted fixed w-full  left-0 top-0  z-50 flex items-center justify-between border-b   border-slate-400/35 px-4 py-2 lg:justify-end">
            <div className=" mx-auto flex container items-center justify-between w-full">
                <div className="flex gap-x-2 justify-start items-end">
                    <img src="/images/logo.png" alt="MangaHeaven" className="h-8 md:block hidden " />
                    <h1
                        lang="ar"
                        className=" text-lg md:text-2xl font-bold text-primary ">
                        روبوكس
                    </h1>
                </div>
                <div className="flex items-center justify-center gap-x-7">
                    <ul
                    className=' flex gap-x-4 justify-start items-center'
                    >
                        <li>
                            <a
                            href="/"
                            className="text-sm text-gray-500 dark:text-gray-300">
                                الرئيسية
                            </a>
                        </li>
                        <li>
                            <a
                            href="/all"
                            className="text-sm text-gray-500 dark:text-gray-300">
                                جميع المانجا
                            </a>
                        </li>
                    </ul>
                    <SearchManga />
                    <div className="hidden space-y-2 lg:flex"></div>
                    <ProfileMenu />
                   </div>
                <span className=" flex cursor-pointer lg:hidden">
                    <Menu />
                </span>
              </div>

        </nav>
    );
};

export default MainHeader;
