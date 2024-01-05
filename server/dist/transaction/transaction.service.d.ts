import { Transaction } from './models/transaction.entity';
import { DeepPartial, MongoRepository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Category } from 'src/category/models/category.entity';
export declare class TransactionService {
    private readonly transactionRepository;
    private readonly categoryRepository;
    constructor(transactionRepository: MongoRepository<Transaction>, categoryRepository: MongoRepository<Category>);
    createTransaction(createTransactionDto: CreateTransactionDto, id: string): Promise<{
        id?: DeepPartial<import("typeorm").ObjectId>;
        title?: string;
        type?: string;
        user?: DeepPartial<import("../user/models/user.entity").User>;
        category?: DeepPartial<Category>;
        amount?: number;
        createdAt?: DeepPartial<Date>;
        updatedAt?: DeepPartial<Date>;
    } & Transaction>;
    findAll(id: string): Promise<Transaction[]>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, createTransactionDto: CreateTransactionDto): Promise<import("typeorm").UpdateResult>;
    deleteTransaction(id: string): Promise<import("typeorm").DeleteResult>;
    findAllWithPagination(id: string, page: number, limit: number): Promise<Transaction[]>;
    findAllByType(id: string, type: string): Promise<number>;
}
