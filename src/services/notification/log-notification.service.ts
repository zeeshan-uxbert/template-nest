import { Injectable, Logger } from '@nestjs/common';
import { NotificationService, NotificationOptions } from './notification.service';

@Injectable()
export class LogNotificationService extends NotificationService {
  private readonly logger = new Logger(LogNotificationService.name);

  async sendNotification(options: NotificationOptions): Promise<void> {
    this.logger.log(
      `Notification to user ${options.userId}: [${options.type || 'info'}] ${options.title} - ${options.message}`,
    );
  }

  async sendBulkNotifications(options: NotificationOptions[]): Promise<void> {
    this.logger.log(`Sending ${options.length} notifications in bulk`);
    await Promise.all(options.map((option) => this.sendNotification(option)));
  }
}



