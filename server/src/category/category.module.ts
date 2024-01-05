import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './models/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transaction/models/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Transaction, User])],
  controllers: [CategoryController],
  providers: [CategoryService, TransactionService, UserService, JwtService],
})
export class CategoryModule {}
