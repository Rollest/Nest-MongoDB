import { Category } from 'src/category/models/category.entity';
import { User } from 'src/user/models/user.entity';
import { ObjectId } from 'typeorm';
export declare class Transaction {
    id: ObjectId;
    title: string;
    type: string;
    user: User;
    category: Category;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
