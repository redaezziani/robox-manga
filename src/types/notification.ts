export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

export enum NotificationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  status: NotificationStatus;
  priority: NotificationPriority;
  createdAt: string;
  readAt: string | null;
}
