import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });

    return await this.tasksRepository.save(task);
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

  async remove(id: number, user: User): Promise<{ message: string }> {
    await this.tasksRepository.delete({ id, user: { id: user.id } });
    return { message: 'Task deleted successfully' };
  }
}
