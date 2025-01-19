import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

interface DetailsPathProps {
  title?: string;
}
export default function DetailsPath({ title }: DetailsPathProps) {
  return (
    <Breadcrumb className=" w-full truncate">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" className="flex gap-x-1">
            <Home size={16} strokeWidth={2} aria-hidden="true" />
            <span className="">الرئيسية</span>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <Link href="/all" className="flex gap-x-1">
            <span className="">جميع المانجا</span>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>التفاصيل</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem className=" truncate">
          <BreadcrumbPage className="text-primary truncate">
          {title?.replace(/-/g, ' ').split(' ').slice(0, 4).join(' ')}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
