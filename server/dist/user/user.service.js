"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./models/user.entity");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
require("reflect-metadata");
const bson_1 = require("bson");
let UserService = exports.UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const existUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existUser) {
            throw new common_1.BadRequestException('Этот email уже используется');
        }
        const hashedPassword = await argon2.hash(createUserDto.password);
        const user = new user_entity_1.User();
        user.email = createUserDto.email;
        user.password = hashedPassword;
        await this.userRepository.save(user);
        const token = this.jwtService.sign({ email: createUserDto.email });
        return { user, token };
    }
    async findOne(email) {
        console.log('findOneUser');
        return this.userRepository.findOne({ where: { email: { $eq: email } } });
    }
    async findOneById(id) {
        const objectId = new bson_1.ObjectId(id);
        return this.userRepository.findOne({
            where: {
                _id: { $eq: objectId },
            },
        });
    }
    async update(id, updateUserDto) {
        const objectId = new bson_1.ObjectId(id);
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
            throw new common_1.BadRequestException('There is no transactions with this id');
        }
        return await this.userRepository.update(objectId, updateUserDto);
    }
    async deleteOne(id) {
        const objectId = new bson_1.ObjectId(id);
        return this.userRepository.deleteOne({
            _id: objectId,
        });
    }
    async aggregate() {
        console.log('aggregating');
        const aggregationPipeline = [
            {
                $addFields: {
                    userObjectId: { $toString: '$_id' },
                },
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'userObjectId',
                    foreignField: 'user',
                    as: 'categories',
                },
            },
        ];
        const result = await this.userRepository
            .aggregate(aggregationPipeline)
            .toArray();
        console.log('aggregating');
        return result;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map