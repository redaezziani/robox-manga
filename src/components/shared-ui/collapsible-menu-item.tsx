
"use client";

import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SubItem {
  label: string;
  href: string;
}
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  items: SubItem[];
}

const CollapsibleMenuItem = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex items-center select-none justify-between cursor-pointer py-2 px-4 rounded-md"
        onClick={toggleMenu}
      >
        <span className="font-semibold capitalize text-sm  flex justify-start items-start gap-x-2">
          {item.icon}
          {item.label}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4 text-blue-600" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-stone-600" />
        )}
      </div>

      <motion.ul
        className=" px-6"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        {item.items.map((subItem, index) => {
          if (!subItem.href) return null;
          const isActive = router === subItem.href;

          return (
            <li key={index}>
              <Link
                href={subItem.href}
                className={`block py-2 border-l text-sm px-4 ${isActive ? "border-primary text-primary" : "border-stone-400 text-stone-700"
                  }`}
              >
                {subItem.label}
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default CollapsibleMenuItem;

