import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto, req: any): Promise<{
        id?: import("typeorm").DeepPartial<import("typeorm").ObjectId>;
        title?: string;
        type?: string;
        user?: import("typeorm").DeepPartial<import("../user/models/user.entity").User>;
        category?: import("typeorm").DeepPartial<import("../category/models/category.entity").Category>;
        amount?: number;
        createdAt?: import("typeorm").DeepPartial<Date>;
        updatedAt?: import("typeorm").DeepPartial<Date>;
    } & import("./models/transaction.entity").Transaction>;
    findAll(req: any): Promise<import("./models/transaction.entity").Transaction[]>;
    findOne(req: any, id: string): void;
    update(id: string, createTransactionDto: CreateTransactionDto): void;
    deleteTransaction(id: string): void;
    findAllByType(req: any, type: string): Promise<number>;
    findAllWithPagination(req: any, page: number, limit: number): Promise<import("./models/transaction.entity").Transaction[]>;
}
