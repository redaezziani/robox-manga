'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { FolderCloseIcon, FolderOpenIcon } from '../icons/Folder';

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  items?: MenuItem[];
}

const CollapsibleMenuItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const router = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = item.href && router.startsWith(item.href);
  const hasActiveChild = item.items?.some(
    (subItem) => subItem.href && router.startsWith(subItem.href)
  );

  useEffect(() => {
    if (isActive || hasActiveChild) {
      setIsOpen(true);
    }
  }, [router, isActive, hasActiveChild]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const paddingValues = [4, 0, 0, 0];
  const currentDepth = depth + 1;
  const paddingClass = `pl-${paddingValues[currentDepth - 1] || 4}`;

  // Determine which icon to show based on depth and folder state
  const getIcon = () => {
    if (currentDepth > 1 && item.items) {
      return isOpen ? (
        <FolderOpenIcon className="size-[1.15rem]" />
      ) : (
        <FolderCloseIcon className="size-[1.15rem]" />
      );
    }
    return item.icon;
  };

  const content = (
    <div
      className={cn(
        `flex cursor-pointer select-none items-center justify-between rounded-md py-2`,
        paddingClass,
        isActive ? 'text-primary' : ' text-gray-700'
      )}
      onClick={toggleMenu}
    >
      <span
        className={`flex items-center gap-x-2 text-sm capitalize ${currentDepth === 1 ? 'font-semibold' : ''}`}
      >
        {getIcon()}
        {item.title}
      </span>
      {item.items &&
        depth === 0 &&
        (isOpen ? (
          <ChevronUpIcon className="size-4" />
        ) : (
          <ChevronDownIcon className="size-4 text-stone-600" />
        ))}
    </div>
  );

  return (
    <div>
      {item.href ? (
        <Link className="" href={item.href}>
          {content}
        </Link>
      ) : (
        content
      )}

      {item.items && (
        <motion.ul
          className={`px-6   ${currentDepth > 1 ? 'ml-6 ' : ''}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {item.items.map((subItem, index) => (
            <li key={index}>
              <CollapsibleMenuItem item={subItem} depth={currentDepth} />
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default CollapsibleMenuItem;
