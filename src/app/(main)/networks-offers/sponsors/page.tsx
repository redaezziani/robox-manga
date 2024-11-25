"use client";

import MainPageLayout from "@/components/shared-ui/layouts/main-page-layout";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import CardLayout from "@/components/shared-ui/layouts/card-layout";
const PageSponsors = () => {
  const { toast } = useToast();

  const handelNotification = () => {
    toast({
      variant: "default",
      title: "Employee created",
      description: "The employee has been created successfully",
    });
  };

  const handelNotification2 = () => {
    toast({
      variant: "success",
      title: "Employee created",
      description: "The employee has been created successfully",
    });
  };

  const handelNotification3 = () => {
    toast({
      variant: "error",
      title: "Employee created",
      description: "The employee has been created successfully",
    });
  };
  return (
    <MainPageLayout>
      <section className="flex flex-col  justify-start items-start ">
        <h2 className=" text-lg font-semibold text-gray-800 dark:text-gray-50 ">
          Networks Offres
        </h2>
        <p className=" text-sm text-gray-500 dark:text-gray-300">
          you can manage and create the Networks Offres
        </p>
       
      </section>

      <div className="flex gap-x-2 w-full">
        <CardLayout className=" min-h-96 w-full"/>
        </div>
    </MainPageLayout>
  );
};

export default PageSponsors;
