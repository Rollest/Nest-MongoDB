import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/models/user.entity';
import { ObjectId } from 'typeorm';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  user: string;
}
