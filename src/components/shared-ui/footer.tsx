'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/newsletter"
import { subscribeToNewsletter } from "@/lib/actions/newsletter"
import { useState } from "react"
import { toast } from "sonner"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getCookies } from '@/lib/cookies'
import { Loader, Loader2 } from "lucide-react";

export default function Footer() {
    const [isPending, setIsPending] = useState(false)
    
    const form = useForm<NewsletterInput>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: NewsletterInput) {
        setIsPending(true)
        try {
            const result = await subscribeToNewsletter(data.email)
            if (result.error) {
                toast.error('حدث خطأ أثناء الاشتراك')
                return
            }
            toast.success("تم الاشتراك بنجاح!")
            form.reset()
        } finally {
            setIsPending(false)
        }
    }

    return (
        <footer lang='ar' className="py-8 mt-14 border border-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    {/* Logo and App Name */}
                    <div className="w-full md:w-1/3 text-center md:text-right mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Robox | روبوكس</h2>
                        <p className="text-sm mt-2">تطبيق المانجا الأول</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="w-full md:w-1/3 mb-4 md:mb-0">
                        <ul className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                            <li><Link href="/" className="hover:text-gray-300">الرئيسية</Link></li>
                            <li><Link href="/manga" className="hover:text-gray-300">المانجا</Link></li>
                            <li><Link href="/about" className="hover:text-gray-300">عن روبوكس</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300">اتصل بنا</Link></li>
                        </ul>
                    </nav>

                    {/* Updated Subscription Form */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
                            اشترك في النشرة الإخبارية
                        </h3>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="flex flex-col sm:flex-row gap-2"
                        >
                            <div className="flex-1">
                                <Input
                                    type="email"
                                    className='bg-muted'
                                    placeholder="بريدك الإلكتروني"
                                    disabled={isPending}
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <p className="text-xs text-destructive mt-1">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader className="ml-2 h-4 w-4 animate-spin" />
                                        جاري الاشتراك...
                                    </>
                                ) : (
                                    "اشترك"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} Robox. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    )
}

