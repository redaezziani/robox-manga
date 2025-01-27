import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Files } from "lucide-react";

interface AddChapterForm {
  chapterNumber: number;
}

interface AddChapterDialogProps {
  mangaId: string;
}

interface ShowToastParams {
  title: string;
  description: string;
  type: 'success' | 'error';
}

const showToast = ({ title, description, type }: ShowToastParams) => {
  toast[type](title, {
    description: description,
  });
};

export function AddChapterDialog({ mangaId }: AddChapterDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<AddChapterForm>({
    defaultValues: {
      chapterNumber: 1,
    },
  });

  const onSubmit = async (data: AddChapterForm) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/manga/chapter?mangaId=${mangaId}&chapterNumber=${data.chapterNumber}`,
        {
          method: 'POST',
          headers: {
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to add chapter');
      
      showToast({
        title: "تم إضافة الفصل بنجاح ✅",
        description: "تمت إضافة الفصل بنجاح إلى قاعدة البيانات",
        type: 'success'
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      showToast({
        title: "خطأ في إضافة الفصل ❌",
        description: "حدث خطأ أثناء محاولة إضافة الفصل",
        type: 'error'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Files className="ml-2" size={16} />
          إضافة فصل
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة فصل جديد</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="chapterNumber"
              rules={{ 
                required: "هذا الحقل مطلوب",
                min: { value: 1, message: "يجب أن يكون الرقم أكبر من 0" }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الفصل</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              إضافة
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
