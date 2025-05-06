import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActiveStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ActiveStatus)
  @IsOptional()
  status: string;
}
