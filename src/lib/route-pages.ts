import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  Files,
  Home,
  Library,
  Settings,
  Users,
} from 'lucide-react';

export interface SubMenuItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

export interface MenuItem {
  title: string;
  items?: SubMenuItem[];
  icon?: LucideIcon;
  href?: string;
}

export const Pages: MenuItem[] = [
  {
    title: 'لوحة التحكم',
    icon: Home,
    items: [
      {
        title: 'الإحصائيات',
        href: '/admin/dashboard',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'إدارة المانجا',
    icon: BookOpen,
    items: [
      {
        title: 'قائمة المانجا',
        href: '/admin/manga',
        icon: Library,
      },
      {
        title: 'الفصول',
        href: '/admin/chapters',
        icon: Files,
      },
      {
        title: 'إضافة مانجا',
        href: '/admin/manga/create',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'إدارة المستخدمين',
    icon: Users,
    items: [
      {
        title: 'المستخدمين',
        href: '/admin/users',
        icon: Users,
      },
      {
        title: 'الأدوار والصلاحيات',
        href: '/admin/roles',
        icon: Users,
      },
    ],
  },
  {
    title: 'الإعدادات',
    icon: Settings,
    items: [
      {
        title: 'إعدادات عامة',
        href: '/admin/settings/general',
        icon: Settings,
      },
      {
        title: 'إعدادات الموقع',
        href: '/admin/settings/site',
        icon: Settings,
      },
      {
        title: 'الملف الشخصي',
        href: '/admin/settings/profile',
        icon: Users,
      },
    ],
  },
];
