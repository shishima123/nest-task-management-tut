import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;
}
