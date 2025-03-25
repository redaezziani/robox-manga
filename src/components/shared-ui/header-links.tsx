"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const navigationItems = [
    { name: 'الرئيسية', href: '/app' },
    { name: 'جميع المانجا', href: '/app/all' },
    { name: 'المفضلة', href: '/app/favorites' },
    { name: 'قراءة لاحقاً', href: '/app/read-later' },
    { name: 'الإعدادات', href: '/app/settings' },
];

const HeaderLinks = () => {
    const pathname = usePathname();
    return (
        <ul className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
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
    )
}

export default HeaderLinks