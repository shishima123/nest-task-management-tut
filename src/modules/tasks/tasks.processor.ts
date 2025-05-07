import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TaskSendEmail } from './types/task-send-email.type';
import { MailService } from '../mail/mail.service';

@Processor('taskEmailQueue')
export class TasksProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }
  async process(job: Job<TaskSendEmail, any, string>): Promise<void> {
    console.log(`Processing job ${job.id} with data:`, job.data);

    await this.mailService.sendTaskCreated(
      job.data.userEmail,
      job.data.taskId,
      job.data.taskTitle,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.log(`Job ${job.id} failed with error:`, error.message);
  }
}
