import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TaskSendEmail } from './types/task-send-email.type';

@Processor('taskEmailQueue')
export class TasksProcessor extends WorkerHost {
  async process(job: Job<TaskSendEmail, any, string>): Promise<void> {
    console.log(`Processing job ${job.id} with data:`, job.data);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Email sent to ${job.data.userEmail}`);
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
