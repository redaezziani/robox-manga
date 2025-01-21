'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Bell } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Notification, NotificationPriority, NotificationStatus } from '@/types/notification';
import { API_ENDPOINTS } from '@/config/api';

const NotificationSheet = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const tokenFromCookies = Cookies.get('access_token');
        if (!tokenFromCookies) {
            console.error('No access token found');
            return;
        }

        const SERVER_URL = 'http://localhost:8000/notifications';

        const socket = io(SERVER_URL, {
            query: { auth_token: tokenFromCookies },
        });

        socket.on('connect', () => {
            socket.emit('subscribe', (response: any) => {
                if (response.status === 'subscribed') {
                } else {
                }
            });
        });

        socket.on('notification', (data: any) => {
            setNotifications((prev) => [data, ...prev]);
            setUnreadCount((prev) => prev + 1);
        });

        socket.on('error', (error: any) => {
            console.error('Error from server:', error);
        });

        // Handle disconnection
        socket.on('disconnect', (reason: any) => {
            console.log('Disconnected from server:', reason);
        });

        // Save socket connection to state
        setSocket(socket);

        // Clean up socket connection when the component is unmounted
        return () => {
            socket.disconnect();
        };
    }, []);

    const markAsRead = async (notificationId: string) => {
        try {
            await fetch(`${API_ENDPOINTS.notifications}/${notificationId}/read`, {
                method: 'POST',
            });
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === notificationId
                        ? {
                            ...n,
                            status: NotificationStatus.READ,
                            readAt: new Date().toISOString(),
                        }
                        : n
                )
            );
            setUnreadCount((prev) => prev - 1);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const getPriorityColor = (priority: NotificationPriority) => {
        switch (priority) {
            case NotificationPriority.URGENT:
                return 'bg-destructive text-destructive-foreground';
            case NotificationPriority.HIGH:
                return 'bg-yellow-500 text-yellow-50';
            case NotificationPriority.MEDIUM:
                return 'bg-blue-500 text-blue-50';
            default:
                return 'bg-secondary text-secondary-foreground';
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <span
                    className="relative"
                    onClick={() => setIsOpen(true)}
                >
                    <Bell size={16} />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </span>
            </SheetTrigger>
            <SheetContent lang="ar" side="left" className="w-[90%] md:max-w-lg">
                <div
                    className=' mt-8 flex justify-between items-start w-full'
                >
                    <SheetTitle className="text-right">الإشعارات</SheetTitle>
                    {unreadCount == 0 && (
                        <p


                            className="text-accent dark:text-gray-400 cursor-pointer"
                            onClick={() => {
                                setNotifications((prev) =>
                                    prev.map((n) =>
                                        n.status === NotificationStatus.PENDING
                                            ? { ...n, status: NotificationStatus.READ, readAt: new Date().toISOString() }
                                            : n
                                    )
                                );
                                setUnreadCount(0);
                            }
                            }
                        >
                            تحديث الكل
                        </p>
                    )}

                </div>
                <div className="flex flex-col gap-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`rounded-lg border p-4 ${notification.status === 'PENDING' ? 'bg-accent' : ''
                                }`}
                            onClick={() => {
                                if (notification.status === 'PENDING') {
                                    markAsRead(notification.id);
                                }
                            }}
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <Badge className={getPriorityColor(notification.priority)}>
                                    {notification.priority}
                                </Badge>
                                <span className="text-muted-foreground text-sm">
                                    {format(new Date(notification.createdAt), 'PP', {
                                        locale: ar,
                                    })}
                                </span>
                            </div>
                            <h4 className="text-right font-semibold">{notification.title}</h4>
                            <p className="text-muted-foreground text-right text-sm">{notification.message}</p>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NotificationSheet;
