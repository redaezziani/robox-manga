'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookies } from "@/lib/cookies";
import { Camera, User, Mail, Save, KeyRound, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { showToast } from "@/components/shared-ui/toast.tsx/normal";

interface UserData {
    name: string;
    email: string;
    profile: string;
}

export default function UserSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [avatar, setAvatar] = useState("/placeholder-avatar.jpg");

    // Load user data from session
    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
            const user = JSON.parse(sessionUser);
            setUserData(user);
            setAvatar(user.profile || "/placeholder-avatar.jpg");
        }
    }, []);

    const uploadImage = async (file: File) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = await getCookies();
            const response = await fetch('http://localhost:8000/api/profiles/image', {
                method: 'PATCH',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token?.value}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to upload image');
            }

            const data = await response.json();
            setAvatar(data.imageUrl);
            
            const updatedUser = { ...userData, profile: data.imageUrl };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            
            showToast({
                title: "تم رفع الصورة بنجاح",
                description: "تم تحديث صورتك الشخصية",
                type: 'success'
            });
        } catch (error) {
            console.error('Upload error:', error);
            showToast({
                title: "خطأ في رفع الصورة",
                description: error instanceof Error ? error.message : "حدث خطأ أثناء رفع الصورة",
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
            await uploadImage(file);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl " dir="rtl">
            {/* Profile Section */}
            <section className="space-y-6">
                <div className="flex flex-col items-start space-y-4">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="الصورة الشخصية"
                            className="h-24 w-24 rounded-lg object-cover ring-1 ring-border/50"
                        />
                        <Label
                            htmlFor="avatar"
                            className={`absolute bottom-0 right-0 rounded-lg bg-background p-2 text-foreground hover:bg-muted cursor-pointer shadow-sm ring-1 ring-border/50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                        </Label>
                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                            disabled={isLoading}
                        />
                    </div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <User className="h-5 w-5" /> المعلومات الشخصية
                    </h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="flex items-center gap-2 mb-1.5">
                            <User className="h-4 w-4" /> الاسم
                        </Label>
                        <Input 
                            id="name" 
                            placeholder="أدخل اسمك" 
                            className="bg-muted" 
                            defaultValue={userData?.name || ''}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-1.5">
                            <Mail className="h-4 w-4" /> البريد الإلكتروني
                        </Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="your@email.com" 
                            className="bg-muted" 
                            defaultValue={userData?.email || ''}
                        />
                    </div>
                    <Button
                    variant={'outline'}
                    className=" w-fit " disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="ml-2 h-4 w-4" />
                        )}
                        حفظ التغييرات
                    </Button>
                </div>
            </section>

            {/* Password Section */}
            <section className="space-y-6">
                <h3 className="text-lg font-medium flex items-start gap-2">
                    <KeyRound className="h-5 w-5" /> تغيير كلمة المرور
                </h3>
                <div className="space-y-4">
                    <Input 
                        type="password" 
                        placeholder="كلمة المرور الحالية" 
                        className="bg-muted" 
                    />
                    <Input 
                        type="password" 
                        placeholder="كلمة المرور الجديدة" 
                        className="bg-muted" 
                    />
                    <Input 
                        type="password" 
                        placeholder="تأكيد كلمة المرور" 
                        className="bg-muted" 
                    />
                    <Button 
                        variant={'outline'}
                        className=" w-fit " 
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        ) : (
                            <KeyRound className="ml-2 h-4 w-4" />
                        )}
                        تحديث كلمة المرور
                    </Button>
                </div>
            </section>
        </div>
    );
}
