import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
const CardLayout = ({ children, className }: CardLayoutProps) => {
  return (
    <Card
      className={cn(
        'border-t-primary flex  flex-col border-t-2 p-0',
        className
      )}
    >
      <CardContent className="w-full p-0">{children}</CardContent>
    </Card>
  );
};

export default CardLayout;
