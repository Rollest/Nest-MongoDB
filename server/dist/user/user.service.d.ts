import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.entity';
import { JwtService } from '@nestjs/jwt';
import 'reflect-metadata';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: MongoRepository<User>, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    findOne(email: string): Promise<User | undefined>;
    findOneById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteOne(id: string): Promise<import("typeorm/driver/mongodb/typings").DeleteResult>;
    aggregate(): Promise<User[]>;
}
