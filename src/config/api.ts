export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000';

export const API_ENDPOINTS = {
  notifications: `${API_BASE_URL}/api/notifications`,
  notificationSocket: `${WS_BASE_URL}/notifications`,
} as const;
