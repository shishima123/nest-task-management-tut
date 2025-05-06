import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { User as UserEntity } from '../users/entities/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @User() user: UserEntity) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserEntity) {
    return this.tasksService.findOne(+id, user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user: UserEntity,
  ) {
    return this.tasksService.update(+id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.tasksService.remove(+id, user);
  }
}
