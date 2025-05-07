import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    @InjectQueue('taskEmailQueue')
    private emailQueue: Queue,
  ) {}
  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });
    await this.tasksRepository.save(task);

    const job = await this.emailQueue.add('task-send-email', {
      userId: user.id,
      userEmail: user.email,
      taskId: task.id,
      taskTitle: task.title,
    });
    console.log(`Job ${job.id} added to queue`);
    return task;
  }

  async findAll(user: User): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User): Promise<Task | null> {
    return await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task | null> {
    await this.tasksRepository.update(
      { id, user: { id: user.id } },
      updateTaskDto,
    );

    return this.findOne(id, user);
  }

  async remove(id: number, user: User): Promise<null> {
    await this.tasksRepository.delete({ id, user: { id: user.id } });
    return null;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'checkOverdueTasks' })
  async checkOverdueTasks() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const tasks = await this.tasksRepository.find({
      where: { updatedAt: LessThan(oneWeekAgo) },
    });
    if (tasks.length === 0) {
      console.log('No overdue tasks found');
      return;
    }
    console.log('Called every 5 seconds');
    tasks.forEach((task: Task) => {
      console.log(
        `Task ${task.id} is overdue (last updated: ${task.updatedAt})`,
      );
      this.tasksRepository.remove(task);
    });
  }
}
