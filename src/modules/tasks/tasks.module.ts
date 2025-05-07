import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { BullModule } from '@nestjs/bullmq';
import { TasksProcessor } from './tasks.processor';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({
      name: 'taskEmailQueue',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksProcessor, MailService],
})
export class TasksModule {}
