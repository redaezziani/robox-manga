'use client';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Bell } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Notification, NotificationPriority, NotificationStatus } from '@/types/notification';

import { API_ENDPOINTS } from '@/config/api';

const NotificationSheet = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(API_ENDPOINTS.notificationSocket);
    setSocket(socketInstance);

    // Subscribe to notifications
    socketInstance.emit('subscribe', 'd8f82f28-f63c-4977-9e4b-65aaf4111156');

    // Listen for new notifications
    socketInstance.on('notification', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.notifications);
      const result = await response.json();
      // Ensure data is an array
      const data = Array.isArray(result) ? result : result.data || [];
      setNotifications(data);
      setUnreadCount(
        data.filter((n: Notification) => n.status === NotificationStatus.PENDING).length
      );
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Set empty array on error
      setNotifications([]);
      setUnreadCount(0);
    }
  };

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
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => {
            setIsOpen(true);
            fetchNotifications();
          }}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent lang="ar" side="left" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-right">الإشعارات</SheetTitle>
        </SheetHeader>
        {/* <ScrollArea classN/ame="h-[calc(100vh-6rem)] mt-4"> */}
        <div className="flex flex-col gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg border p-4 ${
                notification.status === 'PENDING' ? 'bg-accent' : ''
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
        {/* </ScrollArea> */}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;
