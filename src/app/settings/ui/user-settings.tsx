'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";

export default function UserSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState("/placeholder-avatar.jpg");

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-12 max-w-2xl mx-auto px-4" dir="rtl">
            {/* Profile Section */}
            <section className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="الصورة الشخصية"
                            className="h-24 w-24 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <Label
                            htmlFor="avatar"
                            className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-sm"
                        >
                            <Camera size={14} />
                        </Label>
                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <h3 className="text-lg font-medium">👤 المعلومات الشخصية</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">✍️ الاسم</Label>
                        <Input id="name" placeholder="أدخل اسمك" className="mt-1.5" />
                    </div>
                    <div>
                        <Label htmlFor="email">📧 البريد الإلكتروني</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                    </div>
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : '💾'}
                        حفظ التغييرات
                    </Button>
                </div>
            </section>

            {/* Password Section */}
            <section className="space-y-6">
                <h3 className="text-lg font-medium text-center">🔑 تغيير كلمة المرور</h3>
                <div className="space-y-4">
                    <Input 
                        type="password" 
                        placeholder="كلمة المرور الحالية" 
                        className="mt-1.5" 
                    />
                    <Input 
                        type="password" 
                        placeholder="كلمة المرور الجديدة" 
                        className="mt-1.5" 
                    />
                    <Input 
                        type="password" 
                        placeholder="تأكيد كلمة المرور" 
                        className="mt-1.5" 
                    />
                    <Button className="w-full" variant="secondary" disabled={isLoading}>
                        {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : '🔄'}
                        تحديث كلمة المرور
                    </Button>
                </div>
            </section>
        </div>
    );
}
