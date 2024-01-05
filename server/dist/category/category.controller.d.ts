import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, req: any): Promise<{
        title: string;
        user: string;
    } & import("./models/category.entity").Category>;
    findOne(id: string): Promise<import("./models/category.entity").Category>;
    findByTitle(title: string, req: any): Promise<import("./models/category.entity").Category[]>;
    update(id: string, updateCategoryDto: CreateCategoryDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<void>;
}
