import { Button } from '@/components/ui/button';
import React from 'react';

interface InnerShadowButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}
const InnerShadowButton = ({ children, onClick }: InnerShadowButtonProps) => {
  return (
    <Button 
      className="
       
        text-gray-100
        font-medium
        py-1
        px-4
        rounded-lg
        shadow-inner
        hover:!shadow-lg
        transition-shadow
        duration-200
        ease-in-out
        bg-blue-600
      "
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default InnerShadowButton;