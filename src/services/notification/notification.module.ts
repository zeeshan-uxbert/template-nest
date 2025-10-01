import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { LogNotificationService } from './log-notification.service';

@Global()
@Module({
  providers: [
    {
      provide: NotificationService,
      useClass: LogNotificationService,
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}



