import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NodemailerEmailService } from './nodemailer-email.service';

@Global()
@Module({
  providers: [
    {
      provide: EmailService,
      useClass: NodemailerEmailService,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}



