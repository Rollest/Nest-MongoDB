import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        user: import("./models/user.entity").User;
        token: string;
    }>;
    find(email: string): Promise<import("./models/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm/driver/mongodb/typings").DeleteResult>;
    aggregate(): Promise<import("./models/user.entity").User[]>;
}
