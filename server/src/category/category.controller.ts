import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthorGuard } from 'src/guard/author.guard';
import { ObjectId } from 'typeorm';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoryService.createCategory(createCategoryDto, req.user.id);
  }

  @Get(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findByTitle(@Body() title: string, @Request() req) {
    console.log(title);

    if (title) {
      return this.categoryService.findCategory(title, req.user.id);
    } else return this.categoryService.findAll(req.user.id);
  }

  @Put(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, AuthorGuard)
  delete(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
