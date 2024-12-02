import { create } from 'zustand';
import { Notification } from '../types/notification';

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Idea Submitted',
    message: 'AI-Powered Customer Service Bot has been submitted for review',
    type: 'info',
    timestamp: '2024-03-15T14:00:00Z',
    read: false,
    ideaId: '1',
  },
  {
    id: '2',
    title: 'Quantification Required',
    message: 'Please complete quantification for AI-Powered Inventory Management',
    type: 'warning',
    timestamp: '2024-03-14T09:15:00Z',
    read: false,
    ideaId: '2',
    ideaStage: 'quantify',
  },
];

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter(n => !n.read).length,
  
  addNotification: (notification) => {
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - (state.notifications.find(n => n.id === id)?.read ? 0 : 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.unreadCount - (state.notifications.find(n => n.id === id)?.read ? 0 : 1),
    }));
  },
}));