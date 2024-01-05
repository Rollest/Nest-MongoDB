import { Category } from 'src/category/models/category.entity';
import { User } from 'src/user/models/user.entity';
export declare class CreateTransactionDto {
    title: string;
    amount: number;
    type: 'expense' | 'income';
    category: Category;
    user: User;
}
