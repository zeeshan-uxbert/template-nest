import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('email')
export class EmailQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailQueueProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing email job: ${job.id}`);
    this.logger.log(`Email data: ${JSON.stringify(job.data)}`);

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.logger.log(`Email job ${job.id} completed`);
    return { success: true };
  }
}



