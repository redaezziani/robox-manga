'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, BookMarked, Settings, UserCircle, LogOut, ChevronDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeCookies } from '@/lib/cookies';

interface UserData {
  name: string;
  email: string;
  profile: string;
}


export default function ProfileMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
     const remove = await removeCookies();
            sessionStorage.removeItem('user');
            setUser(null);
            router.push('/login');

    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src={
                user?.profile ||
                ''
              }
              alt="صورة الملف الشخصي"
            />
            <AvatarFallback>{user?.name?.substring(0, 2) || 'KK'}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className="ms-2 opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent lang="ar" className="!w-44">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.name || 'المستخدم'}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email || 'المستخدم@مثال.كوم'}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="!flex !w-full flex-col items-end justify-start gap-2">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex w-full items-center justify-end gap-2">
              <span>الملف الشخصي</span>
              <UserCircle size={16} strokeWidth={2} className="opacity-60" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/favorites" className="flex w-full items-center justify-end gap-2">
              <span>المفضلة</span>
              <BookMarked size={16} strokeWidth={2} className="opacity-60" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/library" className="flex w-full items-center justify-end gap-2">
              <span>المكتبة</span>
              <Book size={16} strokeWidth={2} className="opacity-60" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="!flex !w-full flex-col items-end justify-start gap-2">
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex w-full items-center justify-end gap-2">
              <span>الإعدادات</span>
              <Settings size={16} strokeWidth={2} className="opacity-60" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="!flex !w-full flex-col items-end justify-start gap-2">
          <DropdownMenuItem onClick={handleLogout} className="flex items-center justify-end gap-2">
            <span>تسجيل الخروج</span>
            <LogOut size={16} strokeWidth={2} className="opacity-60" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
