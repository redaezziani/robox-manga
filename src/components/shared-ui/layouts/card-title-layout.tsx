import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardLayoutProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
const CardTitle = ({ title = 'Defalut Card', children, className }: CardLayoutProps) => {
  return (
    <Card className={cn('border-t-primary flex flex-col gap-1 border-t-2', className)}>
      <span>
        <div className="p-2.5">
          <h2>{title}</h2>
        </div>
      </span>
      <CardContent className="border-t p-2.5">{children}</CardContent>
    </Card>
  );
};

export default CardTitle;
