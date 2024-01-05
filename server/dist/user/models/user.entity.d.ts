import { Category } from 'src/category/models/category.entity';
import { Transaction } from 'src/transaction/models/transaction.entity';
import { ObjectId } from 'typeorm';
export declare class User {
    id: ObjectId;
    email: string;
    password: string;
    categories: Category[];
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
}
