import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActiveStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ActiveStatus)
  @IsOptional()
  @IsNotEmpty()
  status?: string;
}
