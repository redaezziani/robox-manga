import React from "react";
import SideMenu from "./mobile-side-bar";
import { Input } from "../ui/input";
import ProfileMenu from "./profile-menu";

const MainHeader = () => {
  return (
    <nav className="bg-white border-b flex  sticky top-0 left-0 border-border py-2   px-4 justify-between lg:justify-end items-center">
      <div className="flex gap-x-7 justify-center items-center">
        <div className="space-y-2">
          <Input
            className="border-transparent hidden lg:flex  lg:w-[25rem] bg-muted shadow-none"
            placeholder="Search for Anything..."
            type="text"
          />
        </div>
        <ProfileMenu />
      </div>
      <span className=" lg:hidden flex cursor-pointer">
        <SideMenu />
      </span>
    </nav>
  );
};

export default MainHeader;
