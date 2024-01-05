import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './models/transaction.entity';
import {
  DeepPartial,
  Repository,
  getMongoManager,
  MongoEntityManager,
  MongoRepository,
} from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Category } from 'src/category/models/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { log } from 'console';
import { ObjectId } from 'bson';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: MongoRepository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    id: string,
  ) {
    console.log(createTransactionDto.category.id);
    const newTransaction: DeepPartial<Transaction> = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: await this.categoryRepository.findOne({
        where: {
          id: createTransactionDto.category.id,
        },
      }),
      user: { id },
    };
    if (!newTransaction) throw new BadRequestException('Something went wrong.');
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: string) {
    return this.transactionRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: string) {
    const objectId = new ObjectId(id);
    return this.transactionRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
  }

  async update(id: string, createTransactionDto: CreateTransactionDto) {
    const objectId = new ObjectId(id);
    const existTransaction = await this.transactionRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
    if (!existTransaction) {
      console.log(id);
      throw new BadRequestException('There is no transactions with this id');
    }
    return await this.transactionRepository.update(
      objectId,
      createTransactionDto,
    );
  }

  async deleteTransaction(id: string) {
    const objectId = new ObjectId(id);
    const existTransaction = this.transactionRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
    if (!existTransaction)
      throw new BadRequestException('There is no transactions with this id');
    return this.transactionRepository.delete(id);
  }

  async findAllWithPagination(id: string, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return transactions;
  }

  async findAllByType(id: string, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      },
    });
    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0);
    return total;
  }
}
