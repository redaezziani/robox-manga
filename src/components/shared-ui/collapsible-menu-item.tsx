'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { MenuItem } from '@/lib/route-pages';
import { cn } from '@/lib/utils';

interface Props {
  item: MenuItem;
}

const CollapsibleMenuItem = ({ item }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  // Auto expand if current route matches
  useEffect(() => {
    if (item.items?.some(subItem => pathname === subItem.href)) {
      setIsOpen(true);
    }
  }, [pathname, item.items]);

  const isActive = (href?: string) => href ? pathname === href : false;

  // Single item link
  if (!item.items) {
    return (
      <Link
        href={item.href || '#'}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
          isActive(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    );
  }

  // Collapsible menu item with subitems
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 transition-colors",
          isOpen ? "bg-accent/50" : "hover:bg-accent/50"
        )}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mr-4 overflow-hidden"
          >
            <div className="absolute bottom-4 left-0 top-0 border-l-2 border-dashed border-accent/50" />
            <div className="space-y-1 pt-2">
              {item.items.map((subItem) => {
                const SubIcon = subItem.icon;
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg pl-6 pr-3 py-2 relative transition-colors group",
                      isActive(subItem.href) ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                    )}
                  >
                   
                    {SubIcon && <SubIcon className="h-4 w-4" />}
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleMenuItem;