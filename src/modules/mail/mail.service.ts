import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTaskCreated(
    userEmail: string,
    taskId: number,
    taskTitle: string,
  ): Promise<void> {
    console.log(`Email sent to ${userEmail}`);
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'New task created',
      html: `
        <h1>New task created!</h1>
        <p>Task id: ${taskId}</p>
        <p>Task title: ${taskTitle}</p>
      `,
    });
  }
}
