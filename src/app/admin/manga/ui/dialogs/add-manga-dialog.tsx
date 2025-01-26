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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface AddMangaForm {
  title: string;
  platform: "ASHEQ" | "ARES";
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

export function AddMangaDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<AddMangaForm>();

  const onSubmit = async (data: AddMangaForm) => {
    try {
      const response = await fetch(`http://localhost:8000/api/manga?title=${data.title}&platform=${data.platform}`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) throw new Error('Failed to add manga');
      
      showToast({
        title: "تم إضافة المانجا بنجاح ✅",
        description: "تمت إضافة المانجا بنجاح إلى قاعدة البيانات",
        type: 'success'
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      showToast({
        title: "خطأ في إضافة المانجا ❌",
        description: "حدث خطأ أثناء محاولة إضافة المانجا",
        type: 'error'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          إضافة مانجا
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة مانجا جديدة</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان المانجا</FormLabel>
                  <FormControl>
                    <Input placeholder="boku-no-hero-academia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              rules={{ required: "هذا الحقل مطلوب" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المنصة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنصة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ASHEQ">ASHEQ</SelectItem>
                      <SelectItem value="ARES">ARES</SelectItem>
                    </SelectContent>
                  </Select>
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
