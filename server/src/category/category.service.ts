import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { Category } from './models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Type, Transform } from 'class-transformer';
import { ObjectId } from 'bson';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, id: string) {
    console.log(id);
    const existCategory = await this.categoryRepository.findOne({
      where: {
        user: id,
        title: createCategoryDto.title,
      },
    });
    if (existCategory)
      throw new BadRequestException('Такая категория уже существует');
    const category = await this.categoryRepository.save({
      title: createCategoryDto.title,
      user: id,
    });
    return category;
  }

  async findAll(id: string) {
    console.log('findAll');

    return await this.categoryRepository.find({
      where: {
        user: id,
      },
    });
  }

  async findOne(id: string) {
    const objectId = new ObjectId(id); // Create a new ObjectId

    return await this.categoryRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
  }

  async findCategory(title: string, id: string) {
    console.log(title);
    console.log(id);
    return await this.categoryRepository.find({
      where: {
        title: { $eq: title },
        user: { $eq: id },
      },
    });
  }

  async updateCategory(id: string, updateCategory: CreateCategoryDto) {
    const objectId = new ObjectId(id);
    const existCategory = await this.categoryRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
    if (!existCategory) throw new BadRequestException('Такой категории нет');
    return await this.categoryRepository.update(id, updateCategory);
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.delete(id);
  }
}
