import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb className=" ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <Home size={16} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">الرئيسية</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator> · </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">المكونات</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator> · </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>شريط التصفح</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
