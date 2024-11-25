"use client";

import MainPageLayout from "@/components/shared-ui/layouts/main-page-layout";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
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
        <div className="flex gap-x-2">
          <Button
          className=" flex gap-2"
          variant={"default"} onClick={handelNotification}>
             <ArrowDownToLine size={18}/>
            pull offres 
          </Button>
          <Button variant={"secondary"} onClick={handelNotification2}>
            notification 2
          </Button>
          <Button variant={"destructive"} onClick={handelNotification3}>
            notification 3
          </Button>
        </div>
      </section>
    </MainPageLayout>
  );
};

export default PageSponsors;
