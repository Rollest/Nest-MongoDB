import { MongoRepository } from 'typeorm';
import { Category } from './models/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: MongoRepository<Category>);
    createCategory(createCategoryDto: CreateCategoryDto, id: string): Promise<{
        title: string;
        user: string;
    } & Category>;
    findAll(id: string): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    findCategory(title: string, id: string): Promise<Category[]>;
    updateCategory(id: string, updateCategory: CreateCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(id: string): Promise<void>;
}
