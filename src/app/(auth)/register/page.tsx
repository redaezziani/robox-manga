'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import PasswordInput from '../ui-sections/password-input';

// Define the validation schema
const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
        .max(50, { message: 'الاسم يجب أن لا يتجاوز 50 حرفًا' }),
    email: z
        .string()
        .min(1, { message: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
    password: z
        .string()
        .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
        .regex(/[A-Z]/, { message: 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل' })
        .regex(/[0-9]/, { message: 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterResponse {
    token: string;
    [key: string]: any;
}

const RegisterPage = () => {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [error, setError] = React.useState('');

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            setError('');
            const { confirmPassword, ...registrationData } = values; // Remove confirmPassword from API request

            const response = await axios.post<RegisterResponse>(
                'http://localhost:8000/api/v1/auth/register',
                registrationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accept: '*/*',
                    },
                }
            );

            // Handle successful registration
            console.log('Registration successful:', response.data);
            // You can store the token in localStorage or use a state management solution
            localStorage.setItem('token', response.data.token);

            // Redirect or update UI as needed
        } catch (err: any) {
            setError(
                err.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب'
            );
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="flex h-screen w-full items-start justify-between gap-3 overflow-hidden">
            <div className="relative flex size-full flex-col items-center justify-between p-3 md:w-1/2">
                <header className="flex w-full items-start justify-between">
                    <Link href={'/'}>
                        <img src="/logo.png" className="w-12 hue-rotate-120" alt="logo" />
                    </Link>
                    <Link
                        className="flex items-center justify-start gap-x-1 font-medium"
                        href={'/'}
                    >
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
                            <h2 className="text-3xl font-semibold text-gray-900">
                                إنشاء حساب جديد
                            </h2>
                            <p className="text-gray-500">
                                مرحبًا بك! يرجى إدخال بياناتك لإنشاء حساب جديد.
                            </p>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        الاسم
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="أدخل اسمك الكامل..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        البريد الإلكتروني
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="بريدك الإلكتروني..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        كلمة المرور
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        تأكيد كلمة المرور
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="mt-3 flex h-10 items-center justify-center gap-x-3 font-medium"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </form>
                </Form>

                <div className="flex w-full items-center justify-center gap-3">
                    <p className="text-sm text-gray-500">
                        بالتسجيل، أنت توافق على{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            شروط الاستخدام
                        </Link>{' '}
                        و{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                            سياسة الخصوصية
                        </Link>
                    </p>
                </div>
            </div>

            <div className="relative hidden h-full w-[45%] items-center justify-center overflow-hidden bg-slate-200 md:flex">
                <img
                    src="/auth/bg.jpg"
                    className="size-full object-cover"
                    alt="background"
                />
            </div>
        </div>
    );
};

export default RegisterPage;