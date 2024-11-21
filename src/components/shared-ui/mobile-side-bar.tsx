"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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

export default function SideMenu() {
  const [user, setUser] = useState({
    name: "Alyssa",
    email: "alyssa@test.com",
    role: "Admin",
  });

  const userPermissions =
    roles.find((role) => role.name === user.role)?.permissions || [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className=" shadow-none" size="icon">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader
        className=" flex justify-start items-start gap-2 flex-col"
        >
          <SheetTitle>
            
          </SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-5 overflow-y-auto h-full w-full">
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
                            (perm.type === "group" &&
                              perm.name === page.title) ||
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
      </SheetContent>
    </Sheet>
  );
}
