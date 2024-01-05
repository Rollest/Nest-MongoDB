import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './models/transaction.entity';
import { Category } from 'src/category/models/category.entity';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category, User])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService, UserService, JwtService],
})
export class TransactionModule {}
