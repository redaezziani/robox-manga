import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ToastOptions {
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export const showToast = ({
  title, 
  description, 
  actionText, 
  onActionClick,
  type = 'info'
}: ToastOptions) => {
  const variant = type === 'error' ? 'destructive' : 'default';

  toast({
    title,
    description,
    variant,
    action: actionText ? (
      <ToastAction 
        altText={actionText} 
        onClick={onActionClick}
      >
        {actionText}
      </ToastAction>
    ) : undefined
  });
};
