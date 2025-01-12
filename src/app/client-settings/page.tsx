'use client';

import React from 'react';

import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';

import ThemeColorSelector from '../(main)/home/ui/shard/theme-switcher';

const PageSponsors = () => {
  return (
    <MainPageLayout>
      <div className="flex w-full items-end justify-between">
        <section className="flex flex-col  items-start justify-start ">
          <h2 className=" text-lg font-semibold text-gray-800 dark:text-gray-50 ">
            Networks Offres
          </h2>
          <p className=" text-sm text-gray-500 dark:text-gray-300">
            you can manage and create the Networks Offres
          </p>
        </section>
      </div>

      <div className="flex w-full gap-x-2">
        <ThemeColorSelector />
      </div>
    </MainPageLayout>
  );
};

export default PageSponsors;
