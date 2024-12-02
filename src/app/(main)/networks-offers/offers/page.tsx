"use client";

import MainPageLayout from "@/components/shared-ui/layouts/main-page-layout";
import React from "react";
import CardLayout from "@/components/shared-ui/layouts/card-layout";

import DataView from "../ui/offers/table-data";

const PageSponsors = () => {
  return (
    <MainPageLayout>
      <div className="flex w-full justify-between items-end">
        <section className="flex flex-col  justify-start items-start ">
          <h2 className=" text-lg font-semibold text-gray-800 dark:text-gray-50 ">
            Networks Offres
          </h2>
          <p className=" text-sm text-gray-500 dark:text-gray-300">
            you can manage and create the Networks Offres
          </p>
        </section>
      </div>

      <div className="flex gap-x-2 w-full">
        <CardLayout className=" min-h-96 w-full px-0">
          <DataView/>
        </CardLayout>
      </div>
    </MainPageLayout>
  );
};

export default PageSponsors;
