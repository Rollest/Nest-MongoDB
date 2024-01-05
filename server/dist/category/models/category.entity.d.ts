import { ObjectId } from 'typeorm';
export declare class Category {
    id: ObjectId;
    title: string;
    user: string;
    transactions: string[];
    createdAt: Date;
    updatedAt: Date;
}
