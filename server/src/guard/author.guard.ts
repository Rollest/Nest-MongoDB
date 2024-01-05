import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { ObjectId } from 'bson';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //console.log(request);

    const { id, type } = request.params;

    let entity;

    switch (type) {
      case 'transaction':
        entity = await this.transactionService.findOne(id);
        break;
      case 'category':
        entity = await this.categoryService.findOne(id);
        break;
      case 'user':
        entity = await this.userService.findOneById(id);
        break;
      default:
        console.log(type === 'user');

        console.log(type);

        throw new NotFoundException('Type not found');
    }

    const user = request.user;
    if (entity && user && entity.user === user._id) {
      console.log('auth OK');
      return true;
    }
    console.log(entity.user.id, user._id);
    throw new BadRequestException('Something went wrong. author.guard.ts');
  }
}
