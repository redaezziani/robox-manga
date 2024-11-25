import React from "react";
import SideMenu from "./mobile-side-bar";
import { Input } from "../ui/input";
import ProfileMenu from "./profile-menu";
import ThemeToggle from "./theme-switcher";
import CommandsInput from "./command-input";


const MainHeader = () => {
  return (
    <nav className=" bg-muted border-b flex z-50  sticky top-0 left-0 border-border py-2   px-4 justify-between lg:justify-end items-center">
      <div className="flex gap-x-7 justify-center items-center">
        <div className="space-y-2 lg:flex hidden">
         <CommandsInput/>
         
        </div>
        <ThemeToggle/>
        <ProfileMenu />
      </div>
      <span className=" lg:hidden flex cursor-pointer">
        <SideMenu />
      </span>
    </nav>
  );
};

export default MainHeader;
