"use client";

import MainPageLayout from "@/components/shared-ui/layouts/main-page-layout";
import React from "react";
import { Button } from "@/components/ui/button";
import CardLayout from "@/components/shared-ui/layouts/card-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Trash } from "lucide-react";
import Data from "./ui/table-data";

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
        <Button>pull offers</Button>
      </div>

      <div className="flex gap-x-2 w-full">
        <CardLayout className=" min-h-96 w-full p-1">
          <div className="w-full mt-2 flex justify-between items-end">
            <div className="flex gap-x-3 w-full justify-start items-center ">
              <span className=" w-36">
                <Select defaultValue="s1">
                  <SelectTrigger id="select-19">
                    <SelectValue placeholder="Select Limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s1">10</SelectItem>
                    <SelectItem value="s2">20</SelectItem>
                    <SelectItem value="s3">30</SelectItem>
                  </SelectContent>
                </Select>
              </span>

              <span className=" w-36">
                <Select defaultValue="s1">
                  <SelectTrigger id="select-19">
                    <SelectValue placeholder="Select Sort type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s1">Id</SelectItem>
                    <SelectItem value="s2">Name</SelectItem>
                    <SelectItem value="s3">Date</SelectItem>
                  </SelectContent>
                </Select>
              </span>

              <span className=" w-36">
                <Select defaultValue="s1">
                  <SelectTrigger id="select-19">
                    <SelectValue placeholder="Select Sort type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s1">Desc</SelectItem>
                    <SelectItem value="s2">Asc</SelectItem>
                  </SelectContent>
                </Select>
              </span>

              <Button
              
              className=" flex gap-x-2 justify-center items-center">
                {" "}
                <Filter size={16} /> fillter
              </Button>

              <Button
                variant={"destructive"}
                className=" flex gap-x-2 justify-center items-center"
              >
                {" "}
                <Trash size={16} /> delete selected
              </Button>
            </div>

            <div className="space-y-2">
            
              <div className="relative">
                <Input
                  className="peer w-80 pe-9 ps-9"
                  placeholder="Search..."
                  type="search"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Search size={16} strokeWidth={2} />
                </div>
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                >
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Data/>
        </CardLayout>
      </div>
    </MainPageLayout>
  );
};

export default PageSponsors;
