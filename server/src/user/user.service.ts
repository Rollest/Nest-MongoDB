import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  getMongoManager,
  MongoRepository,
  getMongoRepository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import 'reflect-metadata';
import { ObjectId } from 'bson';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new BadRequestException('Этот email уже используется');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    const token = this.jwtService.sign({ email: createUserDto.email });

    return { user, token };
  }

  async findOne(email: string): Promise<User | undefined> {
    console.log('findOneUser');

    return this.userRepository.findOne({ where: { email: { $eq: email } } });
  }

  async findOneById(id: string) {
    const objectId = new ObjectId(id);
    return this.userRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const objectId = new ObjectId(id);
    const existUser = await this.userRepository.findOne({
      where: {
        _id: { $eq: objectId },
      },
    });
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }
    if (!existUser) {
      console.log(id);
      throw new BadRequestException('There is no transactions with this id');
    }
    return await this.userRepository.update(objectId, updateUserDto);
  }

  async deleteOne(id: string) {
    const objectId = new ObjectId(id);
    return this.userRepository.deleteOne({
      _id: objectId,
    });
  }

  async aggregate() {
    console.log('aggregating');
    const aggregationPipeline = [
      {
        $addFields: {
          userObjectId: { $toString: '$_id' }, // Convert the user field to ObjectId
        },
      },
      {
        $lookup: {
          from: 'category', // Имя целевой коллекции (в MongoDB обычно во множественном числе)
          localField: 'userObjectId', // Поле из текущей коллекции
          foreignField: 'user', // Поле, по которому выполняется соединение в коллекции Category
          as: 'categories', // Название поля, в котором будет храниться результат JOIN
        },
      },
    ];

    const result = await this.userRepository
      .aggregate(aggregationPipeline)
      .toArray();
    console.log('aggregating');

    return result;
  }
}
