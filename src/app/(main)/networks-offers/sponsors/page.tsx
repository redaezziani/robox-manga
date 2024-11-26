"use client";

import React from "react";
import MainPageLayout from "@/components/shared-ui/layouts/main-page-layout";
import CardLayout from "@/components/shared-ui/layouts/card-layout";
import { Button } from "@/components/ui/button";
import { Download, UserRound } from "lucide-react";
import DataView from "../ui/sponsors/table-data";
import Notification from "../ui/sponsors/add-new-sponsor";
import Sonner from "../ui/sponsors/sonner-test";

const PageAffiliate = () => {
  const handlePullOffers = () => {
    // Handle pulling offers
    console.log("Pulling offers...");
  };

  return (
    <MainPageLayout>
      {/* Header Section */}
      <div className="flex w-full justify-between items-end mb-6">
        <section className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Affiliate Networks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your affiliate networks and synchronize offers
          </p>
        </section>

        <div className="flex items-center gap-3">
            <Sonner/>
            <Notification/>
          <Button
            onClick={handlePullOffers}
            variant="default"
            className="flex items-center gap-2"
          >
            <UserRound className="h-4 w-4" />
            add new 
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <CardLayout className="min-h-[600px] w-full p-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <DataView />
        </CardLayout>
      </div>

      {/* Status Bar - Optional */}
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Last synced: 5 minutes ago
        </span>
      </div>
    </MainPageLayout>
  );
};

export default PageAffiliate;