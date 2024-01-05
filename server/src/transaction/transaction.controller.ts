import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthorGuard } from 'src/guard/author.guard';
import { log } from 'console';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionService.createTransaction(
      createTransactionDto,
      req.user.id,
    );
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.transactionService.findAll(req.user.id);
  }

  @Get(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Request() req, @Param('id') id: string) {
    this.transactionService.findOne(id);
  }

  @Put(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    this.transactionService.update(id, createTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  deleteTransaction(@Param('id') id: string) {
    this.transactionService.deleteTransaction(id);
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Request() req, @Param('type') type: string) {
    console.log(req.user.id, type);
    return this.transactionService.findAllByType(req.user.id, type);
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.transactionService.findAllWithPagination(
      req.user.id,
      +page,
      +limit,
    );
  }
}
