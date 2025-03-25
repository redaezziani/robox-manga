'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationLinksProps {
  items: NavigationItem[];
}

const NavigationLinks = ({ items }: NavigationLinksProps) => {
  const pathname = usePathname();
  
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`text-sm transition-colors hover:text-gray-900 dark:hover:text-primary duration-300 ${
              pathname === item.href 
                ? 'text-primary font-medium' 
                : 'text-gray-500 dark:text-gray-300'
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLinks;
