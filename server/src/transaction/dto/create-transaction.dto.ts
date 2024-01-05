import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/models/category.entity';
import { User } from 'src/user/models/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  type: 'expense' | 'income';

  @IsNotEmpty()
  category: Category;

  @IsOptional()
  user: User;
}
