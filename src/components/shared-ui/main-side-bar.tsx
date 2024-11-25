"use client";
import { useState } from "react";

import CollapsibleMenuItem from "./collapsible-menu-item";
import { Pages } from "@/lib/route-pages";
const roles = [
  {
    name: "Admin",
    permissions: [
      { type: "group", name: "campaigns" },
      { type: "group", name: "subscribers" },
      { type: "group", name: "deliverability" },
      { type: "group", name: "networks & offers" },
    ],
  },
  {
    name: "User",
    permissions: [
      { type: "group", name: "subscribers" },
      { type: "group", name: "campaigns" },
    ],
  },
];

const MainSideBar = () => {
  const user = {
    name: "Alyssa",
    email: "alyssa@test.com",
    role: "Admin",
  }

  const userPermissions =
    roles.find((role) => role.name === user.role)?.permissions || [];
  return (
    <aside className=" bg-muted sticky top-0 left-0 h-screen  w-96 border-r border-border hidden lg:flex justify-start items-start gap-y-3 flex-col">
     <div className="flex gap-2 justify-start items-end">
        <img src="/Spyder_logo.svg" className=" w-32" />
     </div>
      <nav className="mt-20 h-full overflow-y-auto w-full px-2">
        <ul className="space-y-2">
          {Pages.filter((page) => {
            const groupPermission = userPermissions.some(
              (perm) => perm.type === "group" && perm.name === page.title
            );
            const routePermission = page.items.some((item) =>
              userPermissions.some(
                (perm) => perm.type === "route" && perm.name === item.href
              )
            );
            return groupPermission || routePermission;
          }).map((page) => (
            <li key={page.title}>
              <CollapsibleMenuItem
                item={{
                  label: page.title,
                  icon: page.icon, // Pass the icon to CollapsibleMenuItem
                  items: page.items
                    .filter((item) =>
                      userPermissions.some(
                        (perm) =>
                          (perm.type === "group" && perm.name === page.title) ||
                          (perm.type === "route" && perm.name === item.href)
                      )
                    )
                    .map((item) => ({
                      label: item.title,
                      href: item.href,
                    })),
                }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MainSideBar;
