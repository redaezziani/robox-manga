import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DetailsPathProps {
  title?: string;
}
export default function DetailsPath({ title }: DetailsPathProps) {
  return (
    <Breadcrumb className=" ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex gap-x-1">
            <Home size={16} strokeWidth={2} aria-hidden="true" />
            <span className="">الرئيسية</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/all" className="flex gap-x-1">
            <span className="">جميع المانجا</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>التفاصيل</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem className="text-primary">
          <BreadcrumbPage className="text-primary">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
