'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { Bolt, BookOpen, ChevronDown, Layers2, LogOut, Pin, UserPen } from 'lucide-react';

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
    const res = await axios.delete('http://localhost:8000/api/v1/auth/logout');
    if (res.status === 200) {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        sessionStorage.removeItem('user');
        setUser(null);
      }
      document.cookie = 'user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push('/login');
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
                'https://i.pinimg.com/236x/74/f1/ce/74f1ce7c4ad30541384ffb6415ea2745.jpg'
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
        <DropdownMenuGroup className=" !flex !w-full  flex-col items-end justify-start gap-2 ">
          <DropdownMenuItem className=" ">
            <span>الخيار 1</span>
            <Bolt size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>الخيار 2</span>

            <Layers2 size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>الخيار 3</span>

            <BookOpen size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="!flex !w-full  flex-col items-end justify-start gap-2">
          <DropdownMenuItem>
            <span>الخيار 4</span>

            <Pin size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>الخيار 5</span>

            <UserPen size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="!flex !w-full  flex-col items-end justify-start gap-2">
          <DropdownMenuItem onClick={handleLogout}>
            <span>تسجيل الخروج</span>

            <LogOut size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
