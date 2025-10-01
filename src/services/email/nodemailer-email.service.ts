import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailService, EmailOptions } from './email.service';

@Injectable()
export class NodemailerEmailService extends EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NodemailerEmailService.name);

  constructor(private configService: ConfigService) {
    super();
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.smtp.host'),
      port: this.configService.get<number>('email.smtp.port'),
      secure: false,
      auth: {
        user: this.configService.get<string>('email.smtp.user'),
        pass: this.configService.get<string>('email.smtp.pass'),
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get<string>('email.from'),
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);
      throw error;
    }
  }
}



