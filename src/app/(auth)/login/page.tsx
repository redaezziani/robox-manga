'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import PasswordInput from '../ui-sections/password-input';

// Define the validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  password: z
    .string()
    .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
    .regex(/[A-Z]/, {
      message: 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل',
    })
    .regex(/[0-9]/, {
      message: 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل',
    }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginResponse {
  user: {
    email: string;
    name: string;
    profile: string;
  };
}

const Page = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = React.useState('');
  const router = useRouter();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setError('');
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data as LoginResponse;
      sessionStorage.setItem('user', JSON.stringify(data.user));
      router.push('/home/page-1');
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
      console.error('Login error:', err);
    }
  };

  return (
    <div
      lang="ar"
      className="flex h-screen w-full items-start justify-between gap-3 overflow-hidden"
    >
      <div className="relative flex size-full flex-col items-center justify-between p-3 md:w-1/2">
        <header className="flex w-full items-start justify-between">
          <Link href={'/'}>
            <img src="/logo.png" className="hue-rotate-120 w-12" alt="logo" />
          </Link>
          <Link className="flex items-center justify-start gap-x-1 font-medium" href={'/'}>
            <span className="sr-only">العودة إلى الصفحة الرئيسية</span>
            العودة
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12H4M4 12L10 18M4 12L10 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-[30rem] flex-col gap-4"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold ">تسجيل الدخول</h2>
              <p className="text-gray-500">
                مرحبًا بك! يرجى تسجيل الدخول للمتابعة والوصول إلى حسابك.
              </p>
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-3 space-y-2">
                  <FormLabel className="text-sm font-medium">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="بريدك الإلكتروني ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2 space-y-2">
                  <FormLabel className="text-sm font-medium">كلمة المرور</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <Link
                    className="mt-3 flex items-center justify-start gap-x-2 text-sm text-slate-400"
                    href="/password-reset"
                  >
                    نسيت كلمة المرور{' '}
                    <span className="text-primary underline underline-offset-2">
                      إعادة تعيين كلمة المرور
                    </span>
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-3 flex h-10 items-center justify-center gap-x-3 font-medium"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'جارٍ التحميل...' : 'تسجيل الدخول'}
            </Button>
          </form>
        </Form>

        <div className="flex w-full items-center justify-center gap-3">
          <Link
            className="mt-3 flex items-center justify-center gap-x-2 text-sm text-slate-400"
            href="/register"
          >
            ليس لديك حساب؟{' '}
            <span className="text-primary underline underline-offset-2">إنشاء حساب جديد</span>
          </Link>
        </div>
      </div>

      <div className="relative hidden h-full w-[45%] items-center justify-center overflow-hidden bg-slate-200 md:flex">
        <img src="/auth/bg.png" className="size-full object-cover" alt="background" />
      </div>
    </div>
  );
};

export default Page;
