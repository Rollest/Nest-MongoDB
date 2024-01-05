import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';
export declare class AuthorGuard implements CanActivate {
    private readonly transactionService;
    private readonly categoryService;
    private readonly userService;
    constructor(transactionService: TransactionService, categoryService: CategoryService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
