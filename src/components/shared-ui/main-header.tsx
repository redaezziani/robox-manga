import React from 'react';

import Menu from './menu';
import NotificationSheet from './notification-sheet';
import ProfileMenu from './profile-menu';
import ThemeSwitcher from './theme-switcher';

import SearchManga from '@/app/ui/search-manga';

const MainHeader = () => {
  return (
    <nav
      lang="ar"
      className=" bg-muted fixed left-0  top-0 z-50  flex w-full items-center justify-between border-b   border-slate-400/35 px-4 py-2 lg:justify-end"
    >
      <div className=" container mx-auto flex w-full items-center justify-between">
        <div className="flex items-end justify-start gap-x-2">
          <img src="/images/logo.png" alt="MangaHeaven" className="hidden h-8 md:block " />
          <h1 lang="ar" className=" text-primary text-lg font-bold md:text-2xl ">
            روبوكس
          </h1>
        </div>
        <div className="flex items-center justify-center gap-x-7">
          <ul className=" hidden items-center justify-start gap-x-4 md:flex">
            <li>
              <a href="/" className="text-sm text-gray-500 dark:text-gray-300">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="/all" className="text-sm text-gray-500 dark:text-gray-300">
                جميع المانجا
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-x-2">
            <NotificationSheet />
            <ThemeSwitcher />
            <div className=" hidden md:block">
              <SearchManga />
            </div>
            <div className=" md:hidden">
              <ProfileMenu />
            </div>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
