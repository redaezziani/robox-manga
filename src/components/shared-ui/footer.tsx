import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer
        lang='ar'
        className=" py-8    mt-14 border border-border">
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

                    {/* Subscription Form */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-2 text-center md:text-left">اشترك في النشرة الإخبارية</h3>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <Input
                                type="email"
                                placeholder="بريدك الإلكتروني"
                            />
                            <Button type="submit" className="">
                                اشترك
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

