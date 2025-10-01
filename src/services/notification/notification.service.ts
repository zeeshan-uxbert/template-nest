export interface NotificationOptions {
  userId: string | number;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  data?: any;
}

export abstract class NotificationService {
  abstract sendNotification(options: NotificationOptions): Promise<void>;
  abstract sendBulkNotifications(options: NotificationOptions[]): Promise<void>;
}



